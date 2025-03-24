<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\wishlist;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use App\Models\cartitems;
use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller; // Đảm bảo import lớp này
class ReviewController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['getAllReview', 'findReview', ['getReviewProduct']]); // Chặn truy cập nếu chưa đăng nhập
    }
    function addReview(Request $req)
    {
        try {
            $review = new Review();
            $id_user = Auth::user()->id;
            $id_product = $req->input('id_product');
            $rating = $req->input('rating');
            $feedback = $req->input('feedback');
            $check = $review::where('user_id', $id_user)->where('product_id', $id_product)->first();
            if (!$check) {
                $add_review = $review::create([
                    'product_id' => $id_product,
                    'user_id' => $id_user,
                    'rating' => $rating,
                    'review' => $feedback
                ]);
                if ($add_review) {
                    return response()->json([
                        'success' => true,
                        'isReview' => false,
                        'message' => 'Send FeedBack Success'
                    ]);
                }
            } else {
                return response()->json([
                    'success' => true,
                    'isReview' => true,
                    'message' => 'You wrote review before'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function checkReview(Request $req)
    {
        try {
            $review = new Review();
            $id_user = Auth::user()->id;
            $id_product = $req->input('id_product');
            $check = $review::where('user_id', $id_user)->where('product_id', $id_product)->first();
            if (!$check) {
                return response()->json([
                    'isReview' => false

                ]);
            } else {
                return response()->json([
                    'isReview' => true,
                    'data' => $check
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function getReview(Request $req)
    {
        try {
            $review = new Review();
            $id_user = Auth::user()->id;
            $id_product = $req->input('id_product');
            //
            $check = DB::table('reviews as a')

                ->join('product as b', 'a.product_id', '=', 'b.id')
                ->join('typeproduct as c', 'c.id', '=', 'b.idtype')
                ->select('a.*', 'b.namepd', 'b.img', 'c.name')
                ->where('user_id', '=', $id_user)
                ->get();
            return response()->json([
                'success' => true,
                'data' => $check
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function getReviewProduct(Request $req)
    {
        try {
            $review = new Review();

            $id_product = $req->input('id');
            //
            $check = DB::table('reviews as a')

                ->join('user as b', 'a.user_id', '=', 'b.id')
                ->select('a.*', 'b.name')
                ->where('a.product_id', '=',  $id_product)
                ->get();
            return response()->json([
                'success' => true,
                'data' => $check
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function getAllReview(Request $req)
    {
        try {
            $review = new Review();
            $id_product = $req->input('id_product');
            //
            $check = DB::table('reviews as a')
                ->join('product as b', 'a.product_id', '=', 'b.id')
                ->join('typeproduct as c', 'c.id', '=', 'b.idtype')
                ->join('user as d', 'd.id', '=', 'a.user_id')
                ->select('a.*', 'b.namepd', 'b.img', 'c.name as typename', 'd.name as username', 'd.email')
                ->get();
            return response()->json([
                'success' => true,
                'data' => $check
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function findReview(Request $req)
    {

        try {
            $search = $req->input('s');

            $searchReview = DB::table('reviews as a')
                ->join('product as b', 'a.product_id', '=', 'b.id')
                ->join('typeproduct as c', 'c.id', '=', 'b.idtype')
                ->join('user as d', 'd.id', '=', 'a.user_id')
                ->where('b.namepd', 'like', '%' . $search . '%')
                ->orWhere('a.review', 'like', '%' . $search . '%')
                ->orWhere('c.name', 'like', '%' . $search . '%')
                ->orWhere('a.review', 'like', '%' . $search . '%')
                ->orWhere('d.name', 'like', '%' . $search . '%')
                ->orWhere('d.email', 'like', '%' . $search . '%')
                ->select('a.*', 'b.namepd', 'b.img', 'c.name as typename', 'd.name as username', 'd.email')


                ->get();

            return response()->json([
                'success' => true,
                'data' => $searchReview
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function getStar(Request $req)
    {
        try {
            $review = new Review();
            $id_user = Auth::user()->id;
            $id_product = $req->input('id_product');
            //
            $check = DB::table('reviews')->selectRaw('avg(rating) as star')->groupBy('product_id')->where(
                'product_id',
                $id_product
            )->get();

            return response()->json(

                $check
            );
            // return $check;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
