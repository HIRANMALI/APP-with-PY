from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    location = models.CharField(max_length=100)
    date = models.DateField()
    time_slot = models.CharField(max_length=50)
    tour_type = models.CharField(max_length=50)
    language = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.email} - {self.location} on {self.date}"