from django.urls import path
from . import views

urlpatterns = [
    path('hierarchy/<str:codigo>/', views.UserHierarchyView.as_view(), name='user-hierarchy'),
    
    ]   