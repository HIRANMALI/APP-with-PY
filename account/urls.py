from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name="login"),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    # path('validate/', views.validate_token, name="validate_token"),
    # path('check_auth/', views.check_auth, name='check-auth' )
]
