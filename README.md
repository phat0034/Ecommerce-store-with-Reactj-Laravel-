## 🛒 E-Commerce App
🚀 E-Commerce App is a modern and feature-rich online shopping platform, providing a seamless and convenient e-commerce experience. This project serves as a learning journey for me to explore new frameworks, specifically ReactJS, TailwindCSS, and Laravel. I acknowledge that there might be many imperfections and shortcomings along the way, but I am eager to improve. I sincerely appreciate any feedback or suggestions to help refine and enhance this web application. Thank you! 🙌
#### Frontend & Admin: ReactJS + TailwindCSS
#### Backend: Laravel 11
#### Database: MySQL
#### Automatic Table & Data Generation Laravel Migrations & Seeders

## ✨ Core Features
#### 🛍️ Product Features
##### ✅ Display all products
##### ✅ Paginated product listing
##### ✅ View product details
##### ✅ Add products to the cart
##### ✅ Place orders and checkout (COD, PayPal)
##### ✅ Search for products by name
##### ✅ Filter products by category
##### ✅ Product rating and reviews
#### 👤 User Features
##### ✅ View order history
##### ✅ Save cart items persistently
##### ✅ Track review history
##### ✅ Search and filter order history
##### ✅ Edit and manage user profile
##### ✅ Wishlist management
#### 🔧 Admin Panel
##### ✅ Manage products
##### ✅ Manage users
##### ✅ Manage product categories
##### ✅ Manage product reviews
#### 📊 Advanced Features
##### ✅ Enhanced product filtering (category, price, sorting: ascending, descending, popular)
##### ✅ Discount codes and promotions
##### ✅ Revenue tracking by day, week, month
##### ✅ Data visualization (bar and pie charts)
##### ✅ Multiple shipping address options
#### 📱 Responsive Design
##### ✅ Fully optimized for desktop, tablet, and mobile devices
## 🏗️ Technology Stack
- Frontend: ReactJS, TailwindCSS
- Backend: Laravel 11
- Database: MySQL
- Authentication: Laravel Sanctum
- Payment Integration: PayPal API
# 📌 Contributing
- Contributions are welcome! Feel free to submit a pull request or open an issue for any improvements or bug fixes.

# 📜 License
This project is licensed under the MIT License.
## Authors

- [@Minh Phat](https://www.facebook.com/braindoti/)

## ⚡ Setup Instructions
#### 🔹 Backend (Laravel 11)
##### Clone the repository:
```bash 
git clone https://github.com/phat0034/Ecommerce-store-with-Reactj-Laravel-.git
cd TechStore/backend
```
#####  Install dependencies:
```bash 
composer install
```
##### Configure environment variables:
```bash 
cp .env.example .env
php artisan key:generate
```

##### Set up the database and run migrations:
```bash
php artisan migrate --seed
```
##### Start the Laravel server:
```bash 
php artisan serve
```
####  🔹 Frontend & Admin (ReactJS + TailwindCSS)
##### Navigate to the frontend folder:
```bash
cd ../frontend
```
##### Install dependencies:
```bash
npm install
```
##### Start the development server:
```bash
 npm run dev
```

### 🏦 Setting Up PayPal API
#### To enable PayPal payments in this project, follow these steps:
#### 1️⃣ Create a PayPal Developer Account
- Go to PayPal Developer Dashboard

- Log in or sign up for a PayPal Developer account

#### 2️⃣ Create a PayPal App
- Navigate to Dashboard > My Apps & Credentials

- Under Sandbox, click Create App

- Enter an App Name and select a Business Account

#### 3️⃣Configure PayPal in Laravel Backend
- Install the PayPal SDK:
```bash
composer require srmklive/paypal
```
- Publish the package configuration:
```bash
php artisan vendor:publish --provider "Srmklive\PayPal\Providers\PayPalServiceProvider"
```
- Add your PayPal credentials to .env:
```bash
PAYPAL_MODE=sandbox  # Change to 'live' for production
PAYPAL_CLIENT_ID=your-client-id-here
PAYPAL_SECRET=your-secret-key-here
```
- Clear and cache config:
```bash
php artisan config:clear
php artisan config:cache
```