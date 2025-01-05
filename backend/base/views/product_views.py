from django.shortcuts import render

from base.models import Product
from base.models import Review

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework.response import Response
from base.serializers import ProductSerializer
from django.core.paginator import Paginator, EmptyPage , PageNotAnInteger

from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword', '')
    if query:
        products = Product.objects.filter(name__icontains=query)
    else:
        products = Product.objects.all()
        
    page = request.query_params.get('page',1)
    paginator = Paginator(products,10)
    
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
        
        
    serializer = ProductSerializer(products, many = True)
    return Response({'products':serializer.data, 'page': page, 'pages' : paginator.num_pages} )

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many = True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many = False)
    
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request,):
    user = request.user
    
    product = Product.objects.create(
        user = user,
        name = 'Sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0,
        category = 'Sample Category',
        description = '',
        
    )
    
    serializer = ProductSerializer(product, many = False)
    
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduct(request,pk):
    print(f"Updating user with ID: {pk}")
    product = Product.objects.get(_id=pk)

    data = request.data

    product.name = data['name']
    product.price = data['price']
    
    product.brand = data['brand']
    product.countInStock = data ['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    serializer = ProductSerializer(product, many = False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    
    return Response("Product Deleted")

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    
    product_id = data['product_id']
    
    product = Product.objects.get(_id=product_id) 
    
    product.image = request.FILES.get('image')
    product.save()
    
    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    
    data = request.data
    
    alreadyExists = product.review_set.filter(user = user).exists()
    
    if alreadyExists:
        content = {'detail' : 'Product already reviewed'}
        return Response (content, status=status.HTTP_400_BAD_REQUEST)
    elif data['rating'] == 0:
        content = {'detail':'Please select a rating'}
        return Response(content, status= status.HTTP_400_BAD_REQUEST)
    else:
        review = Review.objects.create(
            user=user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment']
        )
        
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        
        total = sum(review.rating for review in reviews)
        product.rating = total / len(reviews)
        product.save()
        
        return Response({'detail': 'Review Added'})