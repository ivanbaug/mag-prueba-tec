from django.urls import path
from companiesapp.views import company_views as views

urlpatterns = [
    path("", views.get_all_companies, name="companies-get"),
    path("create/", views.create_company, name="company-create"),
    path("update/<str:pk>/", views.update_company, name="company-update"),
    path("delete/<str:pk>/", views.delete_company, name="company-delete"),
    path("<str:pk>/", views.get_company, name="company-get"),
]
