from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name="login"),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    # path('validate/', views.validate_token, name="validate_token"),
    # path('check_auth/', views.check_auth, name='check-auth' )
    path('contact/', views.ContactFormView.as_view(), name='contact-form'),
   path("register/local/", views.register_local_guide, name="register_local"),
   path('guide-dashboard/<int:user_id>/', views.get_local_guide_name, name='get_local_guide_name'),
]
