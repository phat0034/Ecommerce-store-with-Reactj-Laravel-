<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\user;
use App\Models\Product;
use App\Models\Typeproduct;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Testing\Fluent\Concerns\Has;

class ProductController extends Controller
{
    function addProduct(Request $req)
    {
        $product = new Product();
        $req->validate([
            'name' => 'required|string',
            'price' => 'required|numeric|min:0',
            'saleprice' => 'required|numeric|min:0',
            // 'typepd' => 'required|string',
            'img' => 'required|file'
        ]);
        $product->namepd = $req->input('name');
        $sameProduct = $product::where('namepd', $req->input('name'))->first();
        if ($sameProduct) {
            return response()->json([
                'success' => false,
                'message' => 'This product has already been added',
            ]);
        }
        $product->price = $req->input('price');
        $product->saleprice = $req->input('saleprice');
        $product->idtype = $req->input('type');
        $img = $req->file('img');
        $nameImg = $img->getClientOriginalName();
        $extensionImg = $img->getClientOriginalExtension(); //ok
        $nameWithoutExtension = str_replace(' ', '', Str::beforeLast($nameImg, '.'));
        $renameImg =  str_replace(' ', '', str_replace($nameWithoutExtension, strtolower($req->input('name')), $nameWithoutExtension));
        $completlyImg = $renameImg . '.' . $extensionImg;
        $doneImg = $img->storeAs('uploads/product', $completlyImg, 'public');
        // $doneImg = $img->store('uploads/product','public',$completlyImg);
        // $img->storeAs('public/uploads/product', $filename);
        // Lưu vào database (ví dụ, nếu có model Product)


        // $product
        $product->img = $doneImg;
        $product->save();

        return response()->json([
            'success' => true,
            'message' => 'add successful',
            'data' => $req->input(),
            'fullnameimg' => $nameImg,
            'nameimg' => $doneImg,
            'extension' => $extensionImg,
            'urlimg' => $doneImg

        ]);
    }
    function editProduct(Request $req)
    {
        try {
            $product = new Product();

            $productId = $req->input('id');
            $nameProduct =  $req->input('namepd');
            $priceProduct =  $req->input('price');
            $saleProduct =  $req->input('saleprice');
            $idTypeProduct =  $req->input('idtype');
            $img = $req->file('img');
            if ($img) {
                $nameImg = $img->getClientOriginalName();
                $extensionImg = $img->getClientOriginalExtension(); //ok
                $nameWithoutExtension = str_replace(' ', '', Str::beforeLast($nameImg, '.'));
                $renameImg =  str_replace(' ', '', str_replace($nameWithoutExtension, strtolower($req->input('namepd')), $nameWithoutExtension));
                $completlyImg = $renameImg . '.' . $extensionImg;
                $doneImg = $img->storeAs('uploads/product', $completlyImg, 'public');
                $editProduct = $product::where('id', $productId)->update(
                    [
                        'namepd' => $nameProduct,
                        'price' => $priceProduct,
                        'saleprice' => $saleProduct,
                        'idtype' => $idTypeProduct,
                        'img' => $doneImg,
                    ]
                );
            } else {

                $editProduct = $product::where('id', $productId)->update(
                    [
                        'namepd' => $nameProduct,
                        'price' => $priceProduct,
                        'saleprice' => $saleProduct,
                        'idtype' => $idTypeProduct,

                    ]
                );
            }


            if ($editProduct) {
                return response()->json([
                    'success' => true,
                    'message' => 'edit successful',



                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),


            ]);
        }
    }
    function deleteProduct(Request $req)
    {
        $product = new Product();
        $id = $req->input('id');
        $namepd = $product::where('id', $id)->value('namepd');
        $replaceName = str_replace(' ', '', $namepd);
        $extensions = ['jpg', 'png', 'webp', 'pdf', 'jpeg']; // Các định dạng cần xóa
        foreach ($extensions as $ext) {
            $filePath = 'uploads/product/' . $replaceName . '.' . $ext;
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }
        }
        $products = Product::where('id', $id)->delete();
        return response()->json([
            'success' => true,
            'message' => 'Product deleted',
            'data' => $filePath
        ]);
    }
    function findProduct(Request $req)
    {
        $product = new Product();
        try {
            $search = $req->input('s');
            $searchUser =  $product::where('namepd', 'like', '%' . $search . '%')->get();

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
    function showProduct(Request $req)
    {
        $product = new Product();
        $getAll = $product::all();
        return response()->json([
            'success' => true,
            'products' => $getAll,
        ]);
    }
    // function showPDMultiChoice(Request $req) //???
    // {
    //     try {

    //         $product = new product();
    //         $type = $req->input('categories');
    //         $price = $req->input('price');
    //         $data = $product::whereIn('idtype', $type)
    //             // ->whereIn('price',$price)
    //             ->paginate(12);
    //         return response()->json([
    //             'success' => true,
    //             'data' => $data
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'data' => $e->getMessage()
    //         ]);
    //     }
    // }
    function showProductPage(Request $req)
    {
        $product = new Product();
        $sort = $req->input('sort');
        $type = $req->input('categories');
        $price = $req->input('price');
        // $query = $product::query();
        $page = $req->input('p');

        // if ($type) {
        //     $query->whereIn('idtype', $type);
        // }


        // $data = $query->paginate($page);
        $query = DB::table('product as a')
            ->leftJoin('reviews as b', 'b.product_id', '=', 'a.id')
            ->select(
                'a.id',
                'a.namepd',
                'a.price',
                'a.saleprice',
                'a.idtype',
                'a.img',
                DB::raw('IFNULL(AVG(b.rating), 0) as avg_rating'),
                DB::raw('COUNT(b.id) as total_reviews')
            )
            ->when($type, function ($query) use ($type) {
                return $query->whereIn('a.idtype', $type);
            })

            ->groupBy('a.id', 'a.namepd', 'a.price', 'a.saleprice', 'a.idtype', 'a.img');
        if ($sort === 'asc' || $sort === 'desc') {
            $query->orderBy(DB::raw('IF(saleprice > 0, saleprice, price)'), $sort);
        } else {
            $query->orderBy('id', 'desc'); // Mặc định sắp xếp theo id nếu không có $sort
        }

        $data = $query->paginate($page);
        try {
            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    function getNewProduct(Request $req)
    {
        $product = new Product();
        $sort = $req->input('sort', 'asc');
        $type = $req->input('categories');
        $price = $req->input('price');
        $query = $product::query();
        $page = $req->input('p');
        if ($type) {
            $query->whereIn('idtype', $type);
        }

        $query = DB::table('product as a')
            ->leftJoin('reviews as b', 'b.product_id', '=', 'a.id')
            ->select(
                'a.id',
                'a.namepd',
                'a.price',
                'a.saleprice',
                'a.idtype',
                'a.img',
                DB::raw('IFNULL(AVG(b.rating), 0) as avg_rating'),
                DB::raw('COUNT(b.id) as total_reviews')
            )
            ->when($type, function ($query) use ($type) {
                return $query->whereIn('a.idtype', $type);
            })
            ->groupBy('a.id', 'a.namepd', 'a.price', 'a.saleprice', 'a.idtype', 'a.img')
            ->orderBy('id', 'desc')->limit(6)->get();

        try {
            return response()->json([
                'success' => true,
                'data' => $query,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    function showProductType(Request $req)
    {
        $product = new Product();
        $type = new Typeproduct();
        $sort = $req->input('sort', 'asc');
        $typename = $req->input('type');
        $idType = $type->where('name', $typename)->value('id');
        $getAll = $product->where('idtype', $idType)->orderBy(DB::raw('If(saleprice >0, saleprice,price)'), $sort)->paginate(12);
        try {
            return response()->json([
                'success' => true,
                'data' => $getAll,

            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()

            ], 500);
        }
    }
    function addType(Request $req)
    {
        $typeProduct = new Typeproduct();
        $req->validate([
            'name' => 'required|string'
        ]);
        $typeProduct->name = $req->input('name');
        $typeProduct->save();
        return response()->json([
            'success' => true,
            'message' => 'Type product added successfully',
            'name' => $req->input('name')
        ]);
    }
    function getType(Request $req)
    {
      try {
        $typeProduct = new Typeproduct();

        $allTypes = $typeProduct::all();

        return response()->json([
            'success' => true,
            'data' => $allTypes
        ]);
      } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'data' => $e->getMessage()
        ]);
      }
    }
    function showDetailProduct($id)
    {
        $product = new Product();
        $detailPD = $product->find($id);
        $detail = DB::table('product as a')
            ->leftJoin('reviews as b', 'b.product_id', '=', 'a.id')
            ->where('a.id', $id)
            ->select(
                'a.id',
                'a.namepd',
                'a.price',
                'a.saleprice',
                'a.idtype',
                'a.img',
                DB::raw('IFNULL(AVG(b.rating), 0) as avg_rating'),
                DB::raw('COUNT(b.id) as total_reviews')
            )->groupBy(
                'a.id',
                'a.namepd',
                'a.price',
                'a.saleprice',
                'a.idtype',
                'a.img',
            )
            ->first();

        if ($detail) {
            return response()->json([
                'success' => true,
                'data' => $detail
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => response()
            ]);
        }
    }
    function searchProductByName(Request $req)
    {
        try {

            $product = new Product();
            $sort = $req->input('sort', 'asc');
            $type = $req->input('categories');
            $price = $req->input('price');
            $getAll = $product;
            $query = $product::query();
            if ($type) {
                $query->whereIn('idtype', $type);
            }

            $query->where('namepd', 'Like', '%' . $req->input('s') . '%')->orderBy(DB::raw('If(saleprice >0, saleprice,price)'), $sort);
            $data = $query->paginate(12);

            // $products = DB::table('product')
            //     ->where('namepd', 'Like', '%' . $req->input('s') . '%')
            //     ->orderBy(DB::raw('If(saleprice >0, saleprice,price)'), $sort)->paginate(12);

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'data' => $e->getMessage()
            ]);
        }
    }
}
