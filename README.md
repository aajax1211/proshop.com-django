# ProShop E-Commerce Platform

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Technology Stack](#technology-stack)
- [Environment Setup](#environment-setup)
- [Installation Guide](#installation-guide)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security Considerations](#security-considerations)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

ProShop is a professional-grade e-commerce platform built using Django REST Framework and PostgreSQL. This application provides a complete solution for online retail operations including product catalog management, user authentication, shopping cart functionality, order processing, payment integration, and an administrative dashboard.

The platform is designed with scalability and performance in mind, utilizing AWS services for database hosting and file storage to ensure reliability and high availability.

## Features

### User Management
- **Registration & Authentication**: JWT-based secure authentication system with token refresh
- **User Profiles**: Customizable user profiles with order history
- **Role-Based Access Control**: Admin, staff, and customer permission levels
- **Password Recovery**: Secure password reset functionality

### Product Management
- **Product Catalog**: Comprehensive product listing with categories and brands
- **Search & Filter**: Advanced product search with multiple filtering options
- **Image Management**: Multiple product images with AWS S3 integration
- **Inventory Tracking**: Real-time stock management system

### Shopping Experience
- **Shopping Cart**: Persistent cart functionality across sessions
- **Wishlist**: Save products for later purchase
- **Product Reviews**: Star ratings and text reviews by verified purchasers
- **Related Products**: Suggested items based on viewing history

### Checkout Process
- **Address Management**: Save and select multiple shipping addresses
- **Shipping Options**: Multiple shipping methods with cost calculation
- **Order Summary**: Detailed order preview before payment
- **Payment Processing**: Integration ready for payment gateways

### Order Management
- **Order Tracking**: Real-time order status updates
- **Order History**: Complete purchase history for users
- **Invoice Generation**: Downloadable PDF invoices
- **Order Notifications**: Email confirmations and status updates

### Admin Dashboard
- **Product Management**: Add, edit, and remove products
- **User Management**: Manage customer accounts and staff access
- **Order Processing**: Update order status and manage fulfillment
- **Analytics**: Sales reports and customer insights

## Architecture

The ProShop platform follows a modern client-server architecture: 

```plaintext
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Frontend      │◄────►│  Django REST    │◄────►│  PostgreSQL      │
│   (React)       │      │  API Backend    │      │  Database        │
└─────────────────┘      └─────────────────┘      └─────────────────┘
        │                        │                         │
        ▼                        ▼                         ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ AWS S3 (Static) │      │ AWS RDS (DB)    │      │ AWS Lambda      │
│ AWS EC2 (Deploy)│      │ AWS SQS (Queue) │      │ AWS SES (Email) │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```


- **API-First Design**: Clean separation between frontend and backend
- **Stateless Authentication**: JWT tokens for secure stateless auth
- **Modular Organization**: Separate apps for different functional areas
- **Scalable Infrastructure**: AWS-based deployment for high availability

## Database Schema

The database is structured around these core models:

### User Model (Django's built-in User)
- Extended with profile information

### Product Model
- Comprehensive product details
- Inventory tracking
- Category and brand relationships

### Order Model
- Order status and payment information
- Relationships with OrderItems and ShippingAddress

### Review Model
- Product ratings and comments
- Verification of purchases

## API Documentation

### Authentication Endpoints

- `POST /api/users/login/` - User login, returns JWT token
- `POST /api/users/register/` - User registration
- `POST /api/users/profile/` - Get user profile
- `PUT /api/users/profile/update/` - Update user profile
- `POST /api/users/password/reset/` - Request password reset

### Product Endpoints

- `GET /api/products/` - List all products with pagination
- `GET /api/products/:id/` - Get single product details
- `POST /api/products/create/` - Create product (Admin only)
- `PUT /api/products/:id/update/` - Update product (Admin only)
- `DELETE /api/products/:id/delete/` - Delete product (Admin only)
- `POST /api/products/:id/reviews/` - Create product review
- `GET /api/products/top/` - Get top rated products

### Order Endpoints

- `POST /api/orders/add/` - Create new order
- `GET /api/orders/myorders/` - Get user's orders
- `GET /api/orders/:id/` - Get order details
- `PUT /api/orders/:id/pay/` - Update order to paid
- `PUT /api/orders/:id/deliver/` - Update order to delivered (Admin only)
- `GET /api/orders/` - List all orders (Admin only)

### Example API Response (Product):

Json
{
"id": 1,
"name": "Airpods Wireless Bluetooth Headphones",
"image": "/images/airpods.jpg",
"brand": "Apple",
"category": "Electronics",
"description": "Bluetooth technology lets you connect...",
"rating": 4.5,
"numReviews": 12,
"price": 89.99,
"countInStock": 10,
"reviews": [
{
"id": 1,
"name": "John Doe",
"rating": 4,
"comment": "Great product, works as expected",
"user": 1,
"createdAt": "2023-01-15T10:30:00Z"
}
]
}


## Technology Stack

### Backend
- **Django 5.1**: High-level Python web framework
- **Django REST Framework**: Toolkit for building Web APIs
- **SimpleJWT**: JSON Web Token authentication for Django REST Framework
- **PostgreSQL**: Robust relational database
- **Pillow**: Image processing library
- **Boto3**: AWS SDK for Python
- **Corsheaders**: Cross-Origin Resource Sharing for Django

### Infrastructure
- **AWS RDS**: Managed PostgreSQL database
- **AWS S3**: Object storage for product images and static files
- **AWS EC2**: Hosting environment

### Development Tools
- **Git**: Version control
- **Docker**: Containerization (optional)
- **pytest**: Testing framework
- **Black**: Code formatting

## Environment Setup

### Prerequisites
- Python 3.9+
- PostgreSQL 13+
- AWS Account
- Git

### Required Environment Variables

Django Configuration
SECRET_KEY=your_secret_key
DEBUG=True/False
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
Database Configuration
DB_NAME=proshop
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_STORAGE_BUCKET_NAME=your_s3_bucket_name
AWS_S3_REGION_NAME=your_s3_region
JWT Settings
SIMPLE_JWT_SECRET_KEY=your_jwt_secret
JWT_ACCESS_TOKEN_LIFETIME=days=30
JWT_REFRESH_TOKEN_LIFETIME=days=1


## Installation Guide

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <project URL>
   cd proshop
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file with required variables
   cp .env.example .env
   # Edit .env with your configurations
   ```

5. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Populate sample data (optional)**
   ```bash
   python manage.py loaddata products
   ```

8. **Run the development server**
   ```bash
   python manage.py runserver
   ```

9. **Access the application**
   - Backend API: http://localhost:8000/api/
   - Admin interface: http://localhost:8000/admin/

### Docker Setup (Optional)

1. **Build Docker image**
   ```bash
   docker-compose build
   ```

2. **Run containers**
   ```bash
   docker-compose up
   ```

## Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes and run tests**
   ```bash
   pytest
   ```

3. **Format code**
   ```bash
   black .
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "Add new feature"
   ```

5. **Push to remote**
   ```bash
   git push origin feature/new-feature
   ```

6. **Create pull request** through GitHub interface

### AWS Deployment

1. **Database Setup**
   - Create PostgreSQL RDS instance
   - Configure security groups to allow access
   - Example configuration in settings.py:
     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.postgresql',
             'NAME': "proshop",
             'USER': "name",
             'PASSWORD': "password",
             'HOST': "proshop-identifier.crgayasoedj4.us-east-2.rds.amazonaws.com",
             'PORT': "5432",
         }
     }
     ```

2. **S3 Bucket Configuration**
   - Create S3 bucket for static and media files
   - Set appropriate CORS and bucket policies
   - Configure Django to use S3 for storage:
     ```python
     DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
     AWS_ACCESS_KEY_ID = 'your-access-key'
     AWS_SECRET_ACCESS_KEY = 'your-secret-key'
     AWS_STORAGE_BUCKET_NAME = 'your-bucket-name'
     ```
3. **EC2 Instance Setup**
   - Launch EC2 instance with Ubuntu
   - Install required packages
   - Configure Nginx as reverse proxy

4. **Application Deployment**
   ```bash
   # On EC2 instance
   git clone https://github.com/yourusername/proshop.git
   cd proshop
   
   # Setup virtual environment
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   
   # Configure environment variables
   nano .env  # Add production environment variables
   
   # Run migrations
   python manage.py migrate
   
   # Collect static files
   python manage.py collectstatic
   
   # Setup Gunicorn systemd service
   sudo nano /etc/systemd/system/gunicorn.service
   
   # Start Gunicorn
   sudo systemctl start gunicorn
   sudo systemctl enable gunicorn
   ```

   ## Security Considerations

- Secret keys and credentials are stored as environment variables
- JWT tokens with appropriate expiration times (30 days for access, 1 day for refresh)
- CORS configuration to restrict access (currently set to allow all origins for development)
- Input validation on all API endpoints
- Password hashing using Django's default PBKDF2 algorithm
- Regular security updates for dependencies


*This README was last updated on January 15, 2025*
