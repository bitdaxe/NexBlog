from rest_framework_simplejwt import authentication as jwt_authentication
from django.conf import settings
from rest_framework import authentication, exceptions as rest_exceptions


def enforce_csrf(request):
    # print(request.data['csrfmiddlewaretoken'])
    check = authentication.CSRFCheck(request)
    reason = check.process_view(request, None, (), {})
    if reason:
      raise rest_exceptions.PermissionDenied('CSRF Failed: %s' % reason)


class CustomAuthentication(jwt_authentication.JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        raw_token = request.COOKIES.get('access') or None 
        # print(raw_token)
        # print("we here")
        if header is None:
            pass
        else:
            raw_token = self.get_raw_token(header)
        # print("we here1")
        if raw_token is None:
            return None
        
        # print("we here")
        validated_token = self.get_validated_token(raw_token)
        enforce_csrf(request)
        return self.get_user(validated_token), validated_token