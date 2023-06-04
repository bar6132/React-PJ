import rest_framework.pagination as pgn
from rest_framework import generics
from game_shop.models import Game
from game_shop.serializers import GameSerializer


class MyPagination(pgn.PageNumberPagination):
    page_size  = 10
    page_query_param = 'page_num'
    max_page_size = 100 


class GamePagination(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    pagination_class = MyPagination

    