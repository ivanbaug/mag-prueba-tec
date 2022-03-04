from django.urls import path
from companiesapp.views import employee_views as views

urlpatterns = [
    path("", views.get_all_employees, name="employees-get"),
    path("create/", views.create_employee, name="employee-create"),
    path("update/<str:pk>/", views.update_employee, name="employee-update"),
    path("delete/<str:pk>/", views.delete_employee, name="employee-delete"),
    path("<str:pk>/", views.get_employee, name="employee-get"),
]
