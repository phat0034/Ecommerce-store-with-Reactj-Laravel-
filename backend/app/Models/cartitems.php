<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cartitems extends Model
{
    use HasFactory;
    protected $table = 'cartitems';
    protected $fillable = ['cart_id', 'product_id', 'quantity', 'price'];
    public $timestamps = false;
    public function cart()
    {
        return $this->belongsTo(cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
