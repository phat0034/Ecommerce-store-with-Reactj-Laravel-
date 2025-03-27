<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Routing\Controller; // Đảm bảo import lớp này
class UserController extends Controller
{

    function register(Request $req)
    {
        $emailValid = User::where('email', $req->input('email'))->first();
        if ($emailValid) {
            return response()->json([
                'success' => false,
                'message' => 'Email has been registered'
            ]);
        }
        try {
            $user = new User();
            $user->name = $req->input('name');
            $user->email = $req->input('email');
            $user->password = hash::make($req->input('password'));
            $user->save();
            $token = JWTAuth::fromUser($user);
            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token

            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function login(Request $req)
    {
        $req->validate([

            'email' => 'required|email',
            'password' => 'required|string'
        ]);
        $user  = User::where('email', $req->email)->first();  // S
        if (!$user || !Hash::check($req->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email or password incorrect, please try again'
            ], 401);
        }
        $token = JWTAuth::fromUser($user);
        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token

        ]);
    }
    function changePass(Request $req)
    {
        $user = new User();
        try {
            $oldpass = $req->input('old_passw');
            $newpass = $req->input('new_pass');
            $confirmpass = $req->input('confirm_pass');
            $idUser = Auth::id();
            if (!$idUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'U must to login first',


                ]);
            }
            $userData = $user::where('id', $idUser)->first();

            if (hash::check($oldpass, $userData->password)) {
                if (!($newpass === $confirmpass)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'New Password Not Same'

                    ]);
                }
                $user::where('id', $idUser)->update(['password' => hash::make($confirmpass)]);
                $token = JWTAuth::fromUser($userData);
                return response()->json([
                    'success' => true,
                    'message' => 'Change password successful',
                    'data' => $user,
                    'token' =>  $token
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Old Password Incorrect,Try Again',
                    'oldpass' => ($oldpass),


                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function getUser(Request $req)
    {
        $user = new User();
        try {
            $idUser = Auth::id();
            if (!$idUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'U must to login for this'
                ]);
            }
            $userData = $user::where('id', $idUser)->first();
            return response()->json([
                'success' => true,
                'data' => $userData
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function getUserAdmin(Request $req)
    {
        $user = new User();
        try {
            $userData =  $user::get();
            return response()->json([
                'success' => true,
                'data' => $userData
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function setRoleAdmin(Request $req)
    {
        $user = new User();
        try {
            $role = $req->input('role');
            $iduser = $req->input('iduser');
            $setRole =  $user::where('id', $iduser)->update(['role' => $role]);
            if (!$setRole) {

                return response()->json([
                    'success' => false,
                    'message' => 'Cannot update role for this user'
                ]);
            }
            return response()->json([
                'success' => true,
                'message' => 'Update Role Complete!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function findUser(Request $req)
    {
        $user = new User();
        try {
            $search = $req->input('s');
            $searchUser =  $user::where('name', 'like', '%' . $search . '%')->orWhere('email', 'like', '%' . $search . '%')->get();

            return response()->json([
                'success' => true,
                'data' => $searchUser
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }


    function addAddress(Request $req)
    {

        $address = new Address();
        $user = new User();
        try {
            $idUser = Auth::id();
            $titleAddress = $req->input('title_address');
            $nameAddress = $req->input('name_address');
            $emailAddress = $req->input('email_address');
            $phoneAddress = $req->input('phone_address');
            $address = $req->input('address');
            if (!$idUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'U must to login for this'
                ]);
            }
            $addressdata =  address::create([
                'user_id' =>  $idUser,
                'title_address' =>   $titleAddress,
                'name_address' =>   $nameAddress,
                'email_address' =>  $emailAddress,
                'phone_address' => $phoneAddress,
                'address_delevery' =>   $address,
            ]);
            return response()->json([
                'success' => true,
                'data' => $addressdata
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function showAddress(Request $req)
    {
        $address = new Address();
        try {
            $idUser = Auth::id();

            if (!$idUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'U must to login for this'
                ]);
            }
            $addressdata = address::where('user_id', $idUser)->get();
            return response()->json([
                'success' => true,
                'data' => $addressdata
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function showAddressAdmin(Request $req)
    {
        $address = new Address();
        try {
            $idUser = $req->input('id');
            $addressdata = address::where('user_id', $idUser)->get();
            return response()->json([
                'success' => true,
                'data' => $addressdata
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function editAddress(Request $req)
    {

        $address = new Address();
        $user = new User();
        try {
            $idUser = Auth::id();
            $id = $req->input('id');
            $titleAddress = $req->input('title_address');
            $nameAddress = $req->input('name_address');
            $emailAddress = $req->input('email_address');
            $phoneAddress = $req->input('phone_address');
            $address = $req->input('address_delevery');
            if (!$idUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'U must to login for this'
                ]);
            }
            $addressdata =  address::where('id', $id)->update([
                'user_id' =>  $idUser,
                'title_address' =>   $titleAddress,
                'name_address' =>   $nameAddress,
                'address_delevery' =>   $address,
                'email_address' =>  $emailAddress,
                'phone_address' => $phoneAddress
            ]);

            if ($addressdata) {
                // Lấy lại bản ghi sau khi cập nhật
                $addressdatas = Address::find($id);
                return response()->json([
                    'success' => true,
                    'message' => 'Cập nhật thành công!',
                    'data' => $addressdatas
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy địa chỉ để cập nhật'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function deleteAddress(Request $req)
    {

        $address = new Address();
        try {
            $idUser = Auth::id();


            $id = $req->input('id');

            if (!$idUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'U must to login for this'
                ]);
            }
            $addressdata =  address::where('id', $id)->delete();
            if ($addressdata) {
                return response()->json([
                    'success' => true,
                    'message' => 'Xóa địa chỉ thành công!',
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Xóa địa chỉ thất bại.',
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function updateAddress(Request $req)
    {

        $address = new Address();
        $user = new User();
        try {
            $idUser = Auth::id();
            $id = $req->input('id');

            $setno = $address::where('user_id', $idUser)->where('set_address', 'yes')->get();
            // ->update(['set_address' => 'no']);
            foreach ($setno as $item) {
                if ($item['set_address'] === 'yes') {
                    $setno = $address::where('user_id', $idUser)->where('id', $item['id'])->update(['set_address' => 'no']);
                }
            }
            $update = $address::where('user_id', $idUser)
                ->where('id', $id)
                ->update(['set_address' => 'yes']);
            if ($update) {
                // Lấy lại bản ghi sau khi cập nhật
                $addressdatas = Address::find($id);
                return response()->json([
                    'success' => true,
                    'message' => 'Cập nhật thành công!',
                    'data' => $addressdatas
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy địa chỉ để cập nhật'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
