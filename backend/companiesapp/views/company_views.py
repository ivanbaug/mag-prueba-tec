from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


from ..serializers import CompanySerializer
from ..models import Company


@api_view(["GET"])
def get_all_companies(request):
    items_per_page = 20

    companies = Company.objects.all().order_by("name")

    # Run paginator
    page = request.query_params.get("page")
    paginator = Paginator(companies, items_per_page)

    try:
        companies = paginator.page(page)
    except PageNotAnInteger:
        companies = paginator.page(1)
    except EmptyPage:
        companies = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)

    serializer = CompanySerializer(companies, many=True)

    return Response(
        {
            "companies": serializer.data,
            "page": page,
            "pages": paginator.num_pages,
        }
    )


@api_view(["GET"])
def get_company(request, pk):
    company = Company.objects.get(id=int(pk))
    serializer = CompanySerializer(company, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def create_company(request):
    data = request.data
    # TODO: Throw error if company already exists
    c_exists = Company.objects.filter(name=data["name"])
    if len(c_exists) > 0:
        return Response(
            {"detail": "Error: Company already exists"},
            status=status.HTTP_409_CONFLICT,
        )
    new_company = Company.objects.create(
        name=data["name"],
        description=data["description"],
    )
    serializer = CompanySerializer(new_company, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
def update_company(request, pk):
    data = request.data
    company = Company.objects.get(id=int(pk))

    # Change company data
    company.name = data["name"]
    company.description = data["description"]
    company.save()
    serializer = CompanySerializer(company, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
def delete_company(request, pk):
    company = Company.objects.get(id=int(pk))
    company.delete()
    return Response("Company Deleted")
