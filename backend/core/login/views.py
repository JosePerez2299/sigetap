
from dj_rest_auth.views import UserDetailsView

class ReadOnlyUserDetailsView(UserDetailsView):
    # Solo permitimos GET (y HEAD/OPTIONS para navegación)
    http_method_names = ['get', 'head', 'options']
