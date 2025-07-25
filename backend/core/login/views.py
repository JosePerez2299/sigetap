
from dj_rest_auth.views import UserDetailsView
from rest_framework.generics import RetrieveAPIView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
User = get_user_model()

class ReadOnlyUserDetailsView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    # Solo permitimos GET (y HEAD/OPTIONS para navegación)
    http_method_names = ['get', 'head', 'options']
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

