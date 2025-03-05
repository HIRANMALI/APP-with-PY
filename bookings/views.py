from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create_booking(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            # You can save this data to your database (Django models)
            return JsonResponse({"message": "Booking successful!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
