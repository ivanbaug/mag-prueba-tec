from rest_framework import serializers
from .models import Company, Employee


class CompanySerializer(serializers.ModelSerializer):
    employees = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Company
        fields = "__all__"

    def get_employees(self, obj):
        employees = obj.employee_set.all()
        serializer = EmployeeSerializer(employees, many=True)
        return serializer.data


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"
