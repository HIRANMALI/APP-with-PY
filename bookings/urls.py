from django.urls import path
from .views import  BookingCreateView, user_bookings

urlpatterns = [
    path("create/",BookingCreateView.as_view(), name="booking_create"),  
    path("<int:user_id>/", user_bookings, name="user_booking")
]
