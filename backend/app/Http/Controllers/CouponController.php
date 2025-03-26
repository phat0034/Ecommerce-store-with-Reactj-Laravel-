<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use App\Models\wishlist;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Models\Cart;
use App\Models\Cartitems;
use App\Models\Product;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller; // Đảm bảo import lớp này

class CouponController extends Controller
{
    function addCoupon(Request $req)
    {
        try {
            $req->validate([
                'expires_at' => 'required|date_format:Y-m-d|after_or_equal:today'
            ]);
            $coupon = new Coupon();
            $code = $req->input('code');
            $discount = $req->input('discount');
            $quantity = $req->input('quantity');
            $usage_limit = $req->input('usage_limit');
            $expires_at = $req->input('expires_at');
            $isSame = $coupon::where('code', $code)->first();
            if (!$isSame) {
                $coupon::create([
                    'code' => $code,
                    'discount' => $discount,
                    'quantity' => $quantity,

                    'expires_at' => $expires_at
                ]);
                return response()->json([
                    'success' => true,
                    'message' => 'Add Coupon Success'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'This Coupon Has Created Before'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function editCoupon(Request $req)
    {
        try {
            $req->validate([
                'expires_at' => 'required|date_format:Y-m-d|after_or_equal:today'
            ]);
            $coupon = new Coupon();
            $id = $req->input('id');
            $code = $req->input('code');
            $discount = $req->input('discount');
            $quantity = $req->input('quantity');
            $usage_limit = $req->input('usage_limit');
            $expires_at = $req->input('expires_at');
            $isSame = $coupon::where('code', $code)->first();
            if (!$isSame) {
                $coupon::where('id', $id)->update(
                    [
                        'code' => $code,
                        'discount' => $discount,
                        'quantity' => $quantity,
                        'expires_at' => $expires_at
                    ]
                );
                return response()->json([
                    'success' => true,
                    'message' => 'Edit Coupon Success'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Coupon Code is valid'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'data' => $req->input(),
                'message' => $e->getMessage()
            ]);
        }
    }
    function deleteCoupon(Request $req)
    {
        try {
            $coupon = new Coupon();
            $id = $req->input('id');
            $coupon::where('id', $id)->delete();
            return response()->json([
                'success' => true,
                'message' => 'Remove Coupon Success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'data' => $req->input(),
                'message' => $e->getMessage()
            ]);
        }
    }
    function getCoupon()
    {
        try {
            $coupon = Coupon::get();
            return response()->json([
                'success' => true,
                'data' =>  $coupon
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function applyCoupon(Request $req)
    {
        try {

            $code = $req->input('code');
            $isValid = Coupon::where('code', $code)->value('discount');
            if ($isValid) {
                return response()->json([
                    'success' => true,
                    'data' =>  $isValid
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' =>  'Invalid Coupon'
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
