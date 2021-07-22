from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Pacient
from .serializers import PacientSerializers
from authentication.models import User


class PacientView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    
    def post(self, request, user_id):
        found_user = User.objects.filter(id=user_id)

        if not found_user:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        user = User.objects.get(id=user_id)  
        
        if request.user.is_staff == True and request.user.is_superuser == False:
            
                data = request.data
                user = User.objects.get(id=request.user.id)
                

                pacient = Pacient.objects.create(user=user, **data) 

                serializer = PacientSerializers(pacient)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
                return Response({"detail": "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN )
       
