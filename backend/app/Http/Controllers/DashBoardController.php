<?php

namespace App\Http\Controllers;

use App\Models\wishlist;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Models\Order;
use App\Models\User;
use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller; // Đảm bảo import lớp này

class DashBoardController extends Controller
{

    function calRevenue()
    {
        try {
            $allMonth = collect(range(1, 12))->map(function ($month) {
                return [
                    'month' => date('M', mktime(0, 0, 0, $month, 1)), // Chuyển số tháng thành chữ
                    'revenue' => 0
                ];
            });

            $getMonthRevenue = Order::selectRaw('MONTH(created_at) as month, SUM(totalprice) as total')
                ->whereYear('created_at', now()->year)
                ->where('status', 'delivered')
                ->groupBy('month')
                ->orderBy('month', 'asc')
                ->get()
                ->keyBy('month');

            $getAllRevenue = $allMonth->map(function ($data) use ($getMonthRevenue) {
                $monthNumber = array_search($data['month'], [
                    1 => 'Jan',
                    2 => 'Feb',
                    3 => 'Mar',
                    4 => 'Apr',
                    5 => 'May',
                    6 => 'Jun',
                    7 => 'Jul',
                    8 => 'Aug',
                    9 => 'Sep',
                    10 => 'Oct',
                    11 => 'Nov',
                    12 => 'Dec'
                ]);
                return [
                    'month' => $data['month'], // Dùng tên tháng thay vì "Month X"
                    'revenue' => $getMonthRevenue[$monthNumber]['total'] ?? 0
                ];
            });

            return response()->json($getAllRevenue);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    function calProductSold()
    {
        try {
            $countProduct = DB::table('order')

                ->join('orderdetails', 'order.id', '=', 'orderdetails.order_id')
                ->join('product', 'product.id', '=', 'orderdetails.product_id')
                ->join('typeproduct', 'typeproduct.id', '=', 'product.idtype')

                ->selectRaw('typeproduct.name as nametype,SUM(orderdetails.order_quantity) as quantity')
                ->groupBy('nametype')
                ->where('order.status', 'delivered')
                ->get();
            return response()->json($countProduct);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function countUser()
    {
        try {
            $countUser = User::count();
            return response()->json($countUser);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function revenueDayYear(Request $req)
    {
        try {
            $date = $req->input('d');
            if ($date === 'year') {
                $total = Order::selectRaw('SUM(totalprice) as total')->where('status', '=', 'delivered')->whereYear('created_at', now()->year)->get();
            } else {
                $total = Order::selectRaw('SUM(totalprice) as total')->where('status', '=', 'delivered')->whereDay('created_at', now()->day)->get();
            }
            return response()->json($total);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function countProductSold(Request $req)
    {
        try {
            $countSold = DB::table('order as a')
                ->join('orderdetails as b', 'a.id', '=', 'b.order_id')
                ->where('a.status', '=', 'delivered')
                ->whereYear('created_at', now()->year)
                ->selectRaw('SUM(order_quantity) as total')
                ->get();
            return response()->json($countSold);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    function checkOrderRencently(Request $req)
    {
        try {
            $countSold = DB::table('order as a')
                ->join('orderdetails as b', 'a.id', '=', 'b.order_id')
                ->orderBy('a.id', 'desc')
                ->select(
                     'a.id',
                    'a.name_order',
                    'a.payment_method',
                    'a.status',
                    DB::raw('GROUP_CONCAT(b.product_name SEPARATOR", ") as product_names')
                )
                ->groupBy('a.id','b.order_id','a.name_order', 'a.payment_method','a.status')
                ->limit(10)
                ->get();
            return response()->json($countSold);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
