<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Orderdetails extends Model
{
    use HasFactory;
    protected $table = 'orderdetails';
    protected $fillable = ['order_id', 'product_id', 'order_quantity', 'product_name', 'product_price'];
    public $timestamps = false;
    public function cart()
    {
        return $this->belongsTo(order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
