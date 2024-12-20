from django.shortcuts import render

from .models import Product

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
# Create your views here.
@api_view(['GET', 'PUT'])
def getRoutes(request):
    routes =[
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        

    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many = False)
    
    return Response(serializer.data)