from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.exceptions import ObjectDoesNotExist

from ..serializers import EmployeeSerializer
from ..models import Company, Employee


@api_view(["GET"])
def get_all_employees(request):
    items_per_page = 20

    # Handle if the request is for a specific company
    query = request.query_params.get("company")
    # print(f"query={query}")
    if query:
        employees = Employee.objects.filter(company=int(query)).order_by("name")
    else:
        # If not return all employees from every company
        employees = Employee.objects.all().order_by("name")

    # Run paginator
    page = request.query_params.get("page")
    paginator = Paginator(employees, items_per_page)

    try:
        employees = paginator.page(page)
    except PageNotAnInteger:
        employees = paginator.page(1)
    except EmptyPage:
        employees = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)

    serializer = EmployeeSerializer(employees, many=True)

    return Response(
        {
            "employees": serializer.data,
            "page": page,
            "pages": paginator.num_pages,
        }
    )


@api_view(["GET"])
def get_employee(request, pk):
    # Returns employee by numeric ID
    try:
        employee = Employee.objects.get(id=int(pk))
        serializer = EmployeeSerializer(employee, many=False)
    except ObjectDoesNotExist:
        return Response(
            {"detail": "Error: Employee does not exist."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    return Response(serializer.data)


@api_view(["POST"])
def create_employee(request):
    data = request.data
    # Throw error if employee already exists
    print(data["company"])
    e_exists = Employee.objects.filter(name=data["name"])
    if len(e_exists) > 0:
        return Response(
            {"detail": "Error: employee already exists"},
            status=status.HTTP_409_CONFLICT,
        )

    try:
        company = Company.objects.get(id=int(data["company"]))
        new_employee = Employee.objects.create(
            name=data["name"],
            company=company,
            department=data["department"],
        )
    except (KeyError, ObjectDoesNotExist):
        return Response(
            {"detail": "Error: No company received or invalid company received."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Update company employee numbers
    company.num_employees = company.employee_set.all().count()
    company.save()

    serializer = EmployeeSerializer(new_employee, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
def update_employee(request, pk):

    data = request.data
    # TODO: Validate if employee exists
    employee = Employee.objects.get(id=int(pk))

    # Change employee data
    employee.name = data["name"]
    employee.department = data["department"]
    employee.save()
    serializer = EmployeeSerializer(employee, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
def delete_employee(request, pk):
    # TODO: Validate if company exists
    employee = Employee.objects.get(id=int(pk))
    company = employee.company

    # Delete employee
    employee.delete()

    # Update company employee numbers
    company.num_employees = company.employee_set.all().count()
    company.save()

    return Response("Employee Deleted")
