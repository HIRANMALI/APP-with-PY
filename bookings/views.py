from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework import generics, permissions
from .models import Booking
from .serializers import BookingSerializer, serializers
from django.contrib.auth import get_user_model
from account.models import CustomUser

User = get_user_model()

class BookingCreateView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]  # ✅ Allow requests without JWT

    def perform_create(self, serializer):
        user_email = self.request.data.get("user")

        if not user_email:
            raise serializers.ValidationError({"user": "User email is required."})

        try:
            user = User.objects.get(email=user_email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"user": "User with this email does not exist."})

        serializer.save(user=user)



def user_bookings(request, user_id):
    # Use the user_id directly from the URL path
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    bookings = Booking.objects.filter(user=user)
    booking_data = [
        {
            "id": booking.id,
            "location": booking.location,
            "date": booking.date,
            "time_slot": booking.time_slot,
            "tour_type":booking.tour_type,
            "language":booking.language,
        }
        for booking in bookings
    ]
    return JsonResponse(booking_data, safe=False)
