from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Historic
from .serializers import HistoricSerializer
from authentication.models import User


class HistoricView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        pressure = Historic.objects.filter(user=user_id)
     
        serializer = HistoricSerializer(pressure, many=True)

        return Response({'username': request.user.username, 'Historic':serializer.data}, status=status.HTTP_200_OK)


    def post(self, request, user_id):
        serializer = HistoricSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        found_user = User.objects.filter(id=user_id)

        if not found_user:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        user = User.objects.get(id=user_id)  
     
        data = request.data
        
        glucose = Historic.objects.create(user=user, **data) 

        serializer = HistoricSerializer(glucose)

        return Response(serializer.data, status=status.HTTP_201_CREATED)