<?php

namespace App\Http\Controllers;


use App\Models\Review;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\user;
use App\Models\product;
use App\Models\typeproduct;
use App\Models\Order;
use App\Models\Orderdetails;

use function PHPUnit\Framework\isNan;
use function PHPUnit\Framework\isNull;

class OrderController extends Controller
{
    function addOrder(Request $req)
    {
        $order = new Order();
        $detail_order = new Orderdetails();
        $iduser = Auth::id();
        $name_order = $req->input('name');
        $address_order = $req->input('address');
        $email_order = $req->input('email');
        $phone_order = $req->input('phone');
        $totalPrice = $req->input('totalprice');
        $payment_method = $req->input('payment_method');
        $order_status = $req->input('status');

        $cartItem = $req->input('items');
        if (!$iduser) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to find id user'
            ]);
        }
        try {
            DB::beginTransaction();
            $orderCreate =  order::create([
                'user_id' => $iduser,
                'name_order' => $name_order,
                'address_order' => $address_order,
                'email_order' => $email_order,
                'phone_order' => $phone_order,
                'totalprice' => $totalPrice,
                'payment_method' => $payment_method,
                'status' => $order_status
            ]);
            if (!$orderCreate) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to create new order '
                ]);
            }
            foreach ($cartItem as $item) {
                $detail_order::create([
                    'order_id' => $orderCreate->id,
                    'product_id' => $item['product_id'],
                    'order_quantity' => $item['quantity'],
                    'product_name' => $item['product_name'],
                    'product_price' => $item['product_price'],
                ]);
            }
            DB::commit();
            return response()->json(['success' => true, 'message' => 'Order created successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
    function showOrder(Request $req)
    {
        $order = new Order();
        $order_details = new Orderdetails();
        $id_admin = $req->input('admin');
        try {
            if ($id_admin == 'true') {
                $dataOrder = DB::table('order')
                    ->join('user', 'order.id', '=', 'user.id')
                    ->select('order.*', 'user.name')
                    ->get();
                return response()->json([
                    'success' => true,
                    'data' => $dataOrder,

                ]);
            } else {
                $iduser = Auth::id();
                if (!$iduser) {
                    return response()->json([
                        'sucess' => false,
                        'message' => 'u must login first'
                    ]);
                }
            }
            $dataOrder =  $order::where('user_id', $iduser)->get();
            return response()->json([
                'success' => true,
                'data' => $dataOrder,

            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
    function editStatusOrder(Request $req)
    {
        $order = new Order();
        try {
            $idOrder = $req->input('id');
            $status = $req->input('status');
            $editStatus = $order::where('id', $idOrder)->update(['status' => $status]);
            if ($editStatus) {
                return response()->json([
                    'success' => true,
                    'message' => 'Change Status Successful'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
    function showDetailOrder(Request $req)
    {
        $order = new Order();
        $order_details = new Orderdetails();


        try {
            // if (!isNan($id_admin)) {
            //     $iduser = $id_admin;
            // } else {
            //     $iduser = Auth::id();
            //     // if (!$iduser) {
            //     //     return response()->json([
            //     //         'sucess' => false,
            //     //         'message' => 'u must login first'
            //     //     ]);
            //     // }
            // }
            $idOrder = $req->input('id_order');
            $dataDetailOrder = $order_details::where('order_id', $idOrder)->get();

            return response()->json([
                'success' => true,
                'data' => $dataDetailOrder
            ]);
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
    function getNearOrder()
    {
        try {
            $order = new Order();
            $id_user =  Auth::id();
            $data = $order::where('user_id', $id_user)->orderBy('id', 'desc')->value('id');
            return response()->json([
                'success' => true,
                'data' => $data,

            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
}
