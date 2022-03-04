from django.db import models

# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False, unique=True)
    description = models.TextField(null=True, blank=True)
    num_employees = models.IntegerField(null=False, blank=False, default=0)

    def __str__(self) -> str:
        return self.name


class Employee(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False, unique=True)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, null=False, blank=False
    )
    department = models.CharField(max_length=200, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self) -> str:
        return self.name
