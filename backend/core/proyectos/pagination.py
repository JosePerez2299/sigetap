from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class ProyectoPagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,  # Total de elementos
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'page_size': self.get_page_size(self.request),
            'data': data
        })
    def get_paginated_response_schema(self, schema):
        """
        Método para que drf_spectacular entienda la estructura de respuesta
        """
        return {
            'type': 'object',
            'properties': {
                'count': {
                    'type': 'integer',
                    'description': 'Total de elementos'
                },
                'total_pages': {
                    'type': 'integer',
                    'description': 'Total de páginas'
                },
                'current_page': {
                    'type': 'integer',
                    'description': 'Página actual'
                },
                'page_size': {
                    'type': 'integer',
                    'description': 'Elementos por página'
                },
                'data': {
                    'type': 'array',
                    'items': schema,
                    'description': 'Lista de elementos'
                },
            },
            'required': ['count', 'total_pages', 'current_page', 'page_size', 'data']
        }