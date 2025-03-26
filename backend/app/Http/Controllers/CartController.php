<?php

namespace App\Http\Controllers;

use App\Models\wishlist;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Models\Cart;
use App\Models\Cartitems;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller; // Đảm bảo import lớp này
use Termwind\Components\Raw;

class CartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['getGuestCart']); // Chặn truy cập nếu chưa đăng nhập
    }
    function addCart(Request $req)
    {
        $cart = new Cart();
        $product = new Product();
        $quantity = $req->input('quantity');
        $idUser =    Auth::id();
        $idProduct = $req->input('idproduct');
        $isValid = $cart::where('user_id', $idUser)->first(); // check xem userid trong bảng cart có hay chưa, nếu có thì biến này là true
        $pricePd = $product::where('id', $idProduct)->value('price');
        $salepricePd = $product::where('id', $idProduct)->value('saleprice');
        $price = $salepricePd > 0 ? $salepricePd : $pricePd;
        if ($isValid) {
            //bỏ qua bước tạo id user của bảng cart,bắt đầu thêm vào bảng itemcart
            $idCart = $cart::where('user_id', $idUser)->value('id');
            $cartItem = Cartitems::where('cart_id', $idCart)->where('product_id', $idProduct)->first();
            if ($cartItem) {
                $cartItem->increment('quantity', $quantity);
            } else {
                Cartitems::create([
                    'cart_id' => $idCart,
                    'product_id' => $idProduct,
                    'quantity' => $quantity,
                    'price' => $price
                ]);
            }
            return response()->json([
                'success' => true,
                'message' => 'same Id user',
                'iduser' => $idUser
            ]);
        } else {
            $cart->user_id = $idUser;
            $cart->save();
            $idCart = $cart::where('user_id', $idUser)->value('id');
            Cartitems::create([
                'cart_id' => $idCart,
                'product_id' => $idProduct,
                'quantity' => $quantity,
                'price' => $price
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Fail to add',
                'iduser' => $idUser
            ]);
        }
    }
    function getItemsCart()
    {
        $cart = new Cart();
        $cartitems = new Cartitems();
        $product = new Product();
        $idUser =    Auth::id();
        $idCart = $cart::where('user_id', $idUser)->value('id');
        $productsIncart = DB::table('product as a')
            ->join('cartitems as b', 'a.id', '=', 'b.product_id')
            ->where('b.cart_id', $idCart)
            ->select('b.*', 'a.img', 'a.namepd')
            ->get();
        return response()->json([
            'success' => true,
            'data' => $productsIncart
        ]);
    }
    function getGuestCart(Request $req)
    {
        try {
            $cart = new Cart();
            $cartitems = new Cartitems();
            $product = new Product();
            $id = $req->input('idproduct');
            $productsIncart = DB::table('product')
                ->where('id', $id)

                ->get();
            return response()->json([
                'success' => true,
                'data' => $productsIncart
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'data' => $e->getMessage()
            ]);
        }
    }
    function countCart()
    {
        $cart = new Cart();
        $cartitems = new Cartitems();
        $product = new Product();
        $idUser =    Auth::id();
        $idCart = $cart::where('user_id', $idUser)->value('id');
        $countCart = $cartitems::where('cart_id', $idCart)->count();
        return response()->json([
            'success' => true,
            'data' => $countCart
        ]);
    }
    function updateCart(Request  $req, $idProduct)
    {
        $cart = new Cart();
        $cartitems = new Cartitems();
        $product = new Product();
        $idUser =    Auth::id();
        $quantity = $req->input('quantity');
        $idCart = $cart::where('user_id', $idUser)->value('id');
        $productsIncart = DB::table('cartitems')->where('cart_id', $idCart)->where('product_id', $idProduct)->update(['quantity' => $quantity]);
        return response()->json([
            'success' => true,
            'idcart' => $idCart,
            'data' => $productsIncart
        ]);
    }
    function removeAllCart()
    {
        try {
            $cart = new Cart();
            $cartitems = new Cartitems();
            $product = new Product();
            $iduser = Auth::id();
            if (!$iduser) {
                return response()->json([
                    'success' => false,
                    'message' => 'You must login to continue'
                ]);
            }
            $idCart = $cart::where('user_id', $iduser)->value('id');
            $cart::where('id', $idCart)->where('user_id', $iduser)->delete();
            return response()->json([
                'success' => true,
                'message' => 'Cart item removed'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function removeCartById(Request $req)
    {
        try {
            $cart = new Cart();
            $cartitems = new Cartitems();
            $product = new Product();
            $iduser = Auth::id();
            $iditem = $req->input('id');
            // $query = $product::query();
            $idCart = $cart::where('user_id', $iduser)->value('id');
            $kaka = $cartitems::where('cart_id', $idCart)->where('id', $iditem)->delete();
            return response()->json([
                'success' => true,
                'message' => 'Remove Done'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function checkInWishlist(Request $req)
    {
        try {
            $wishlist = new wishlist();
            $iduser = Auth::id();
            $id_product = $req->input('id_product');
            $checkWishlist = $wishlist::where('user_id', $iduser)->where('product_id', $id_product)->first();
            if (!$checkWishlist) {
                return 0;
            }
            return 1;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function getWishlist(Request $req)
    {
        try {
            $wishlist = new wishlist();
            $iduser = Auth::id();
            $getWL = DB::table('wishlist as a')
                ->join('product as b', 'a.product_id', '=', 'b.id')
                ->where('user_id', $iduser)
                ->select('a.*', 'b.img', 'b.namepd', 'b.price', 'b.saleprice')
                ->get();
            return response()->json([
                'success' => true,
                'data' => $getWL,

            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function addWishlist(Request $req)
    {
        try {
            $wishlist = new wishlist();
            $iduser = Auth::id();
            $id_product = $req->input('id_product');
            $checkWishlist = $wishlist::where('user_id', $iduser)->where('product_id', $id_product)->first();
            if ($checkWishlist) {
                return response()->json([
                    'success' => false,
                    'message' => 'This product have in ur wishlist'
                ]);
            }
            $addWishlist = $wishlist::create([
                'user_id' => $iduser,
                'product_id' => $id_product
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Added to wishlist'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function removeWishlist(Request $req)
    {
        try {
            $wishlist = new wishlist();
            $id_wishlist = $req->input('id_wishlist');
            $removeWishlist = $wishlist->where('id', $id_wishlist)->delete();
            if ($removeWishlist) {
                return response()->json([
                    'success' => true,
                    'message' => 'Removed this product on ur Wishlist ',
                    'status' => $removeWishlist
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Fail to delete ',
                    'status' => $removeWishlist
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
