from rest_framework.permissions import BasePermission


class IsOwnerOfBLog(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner.id == request.user.id;

class TPermission(BasePermission):
    def has_permission(self, request, view):
        return True
    
