from itertools import product
from venv import create
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serializers import CompanySerializer
from ..models import Company


@api_view(["GET"])
def get_all_companies(request):
    companies = Company.objects.all().order_by("name")
    serializer = CompanySerializer(companies, many=True)
    return Response(
        # {"companies": serializer.data, "page": page, "pages": paginator.num_pages}
        {"companies": serializer.data, "page": 0, "pages": 0}
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
    company.name == data["name"]
    company.description == data["description"]
    company.save()
    serializer = CompanySerializer(company, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
def delete_company(request, pk):
    company = Company.objects.get(id=int(pk))
    company.delete()
    return Response("Company Deleted")
