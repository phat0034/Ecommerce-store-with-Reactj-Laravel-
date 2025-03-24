<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PayPalController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//User API
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('changepass', [UserController::class, 'changepass']);
Route::get('getuser', [UserController::class, 'getUser']);
Route::get('getuseradmin', [UserController::class, 'getUserAdmin']);
Route::post('setrole', [UserController::class, 'setRoleAdmin']);
Route::get('finduser', [UserController::class, 'findUser']);


//Product API
Route::post('add', [ProductController::class, 'addProduct']);
Route::post('editproduct', [ProductController::class, 'editProduct']);
Route::get('findproduct', [ProductController::class, 'findProduct']);
Route::post('filterProduct', [ProductController::class, 'showPDMultiChoice']);

Route::get('allproduct', [ProductController::class, 'showProduct']);
Route::post('allproductpage', [ProductController::class, 'showProductPage']);
Route::delete('delete', [ProductController::class, 'deleteProduct']);
Route::post('addtype', [ProductController::class, 'addType']);
Route::get('alltype', [ProductController::class, 'getType']);
Route::get('detailproduct/{id}', [ProductController::class, 'showDetailProduct']);
Route::post('searchproduct', [ProductController::class, 'searchProductByName']);
Route::post('getnewproduct', [ProductController::class, 'getNewProduct']);

//Cart API
Route::post('addcart', [CartController::class, 'addCart']);
Route::post('guestitems', [CartController::class, 'getGuestCart']);

Route::get('itemscart', [CartController::class, 'getItemsCart']);
Route::put('updatecart/{id}', [CartController::class, 'updateCart']);
Route::delete('deletecart', [CartController::class, 'removeAllCart']);
Route::delete('deletecartid', [CartController::class, 'removeCartById']);
Route::get('countcart', [CartController::class, 'countCart']);




//wishlist API
Route::get('getwl', [CartController::class, 'getWishlist']);
Route::post('addwl', [CartController::class, 'addWishlist']);
Route::delete('removewl', [CartController::class, 'removeWishlist']);


//Order API
Route::post('addorder', [OrderController::class, 'addOrder']);
Route::get('getorder', [OrderController::class, 'showOrder']);
Route::get('nearorder', [OrderController::class, 'getNearOrder']);
Route::get('getdetailorder', [OrderController::class, 'showDetailOrder']);
Route::post('editstatus', [OrderController::class, 'editStatusOrder']);
//Type API
Route::get('producttype', [ProductController::class, 'showProductType']);


//Rating API
Route::get('getreview', [ReviewController::class, 'getReview']);
Route::post('addreview', [ReviewController::class, 'addReview']);
Route::get('checkreview', [ReviewController::class, 'checkReview']);
Route::get('getallreview', [ReviewController::class, 'getAllReview']);
Route::get('findreview', [ReviewController::class, 'findReview']);
Route::post('getstar', [ReviewController::class, 'getStar']);

Route::get('getrwpd', [ReviewController::class, 'getReviewProduct']);


//Address API
Route::post('addaddress', [UserController::class, 'addAddress']);
Route::post('updateaddress', [UserController::class, 'updateAddress']);
Route::get('showaddress', [UserController::class, 'showAddress']);
Route::get('showaddressadmin', [UserController::class, 'showAddressAdmin']);
Route::post('editaddress', [UserController::class, 'editAddress']);
Route::delete('deleteaddress', [UserController::class, 'deleteAddress']);

//dashboard api

Route::get('typesold', [DashBoardController::class, 'calProductSold']);
Route::get('calrevenue', [DashBoardController::class, 'calRevenue']);
Route::get('countuser', [DashBoardController::class, 'countUser']);
Route::get('revenuedayyear', [DashBoardController::class, 'revenueDayYear']);
Route::get('countsold', [DashBoardController::class, 'countProductSold']);
Route::get('checkrencently', [DashBoardController::class, 'checkOrderRencently']);
//Coupon API

Route::get('getcp', [CouponController::class, 'getCoupon']);
Route::post('addcp', [CouponController::class, 'addCoupon']);
Route::post('applycp', [CouponController::class, 'applyCoupon']);
Route::post('editcp', [CouponController::class, 'editCoupon']);
Route::delete('deletecp', [CouponController::class, 'deleteCoupon']);



#Paypal API
Route::post('/paypal/create-order', [PayPalController::class, 'createOrder']);
Route::post('/paypal/capture-order/{orderId}', [PayPalController::class, 'captureOrder']);
// Route yêu cầu JWT token
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
