from django.db.models.query import QuerySet
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import BloodPressue
from .serializers import BloodPressueSerializers
from authentication.models import User
from datetime import datetime
from django.utils import timezone



class BloodPressureView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = BloodPressue.objects.all()

    
    def get(self, request, user_id):
        if user_id == request.user.id or request.user.is_superuser == True:
            min = self.request.query_params.get('min', '')
            max = self.request.query_params.get('max', '')

            if min and max:

                param = "date_time"

                lookup_filter = {}
                lookup_filter[f'{param}__gte'] = min
                lookup_filter[f'{param}__lte'] = max
                pressure = self.queryset.filter(**lookup_filter, user_id=user_id)
            else:
                pressure = BloodPressue.objects.filter(user=user_id)
        
            serializer = BloodPressueSerializers(pressure, many=True)


            return Response({'username': request.user.username, 'pressure_level':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, user_id):
        serializer = BloodPressueSerializers(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        found_user = User.objects.filter(id=user_id)

        if not found_user:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        user = User.objects.get(id=user_id)  
        date = datetime.now(tz=timezone.utc)
        date_time = date.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
     
        data = request.data
        
        pressure = BloodPressue.objects.create(user=user, date_time=date_time, **data) 

        serializer = BloodPressueSerializers(pressure)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
 
    