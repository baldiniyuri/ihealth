from .models import  User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import CredentialSerializer, UserSerializer


class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        find_user = User.objects.filter(username=request.data['username']).exists()
        
        if find_user:
            return Response(serializer.data, status=status.HTTP_409_CONFLICT)

    
        user = User.objects.create_user(**request.data)


        token = Token.objects.get_or_create(user=user)[0]


        serializer = UserSerializer(user)
        return Response({"data": serializer.data, "token":token.key}, status=status.HTTP_201_CREATED)


class ProtectedView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'user': request.user.username, 'authenticated': True})


class LoginView(APIView):
    def post(self, request):
        serializer = CredentialSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(
            username=request.data['username'], password=request.data['password'])

        if user is not None:
            token = Token.objects.get_or_create(user=user)[0]
            return Response({'token': token.key , 'user_id': user.id, 'is_superuser': user.is_superuser, "email": user.email})

        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
