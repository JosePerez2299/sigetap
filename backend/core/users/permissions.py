from rest_framework import permissions

class IsProjectLeader(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.es_lider
