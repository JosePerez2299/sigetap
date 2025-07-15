
from django.urls import path, include
from .views import ReadOnlyUserDetailsView
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import (
    LoginView, LogoutView
)


urlpatterns = [
    path('login/',      LoginView.as_view(),   name='login'),
    path('logout/',     LogoutView.as_view(),            name='logout'),
    path('user/',       ReadOnlyUserDetailsView.as_view(),       name='user-detail'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),

]
