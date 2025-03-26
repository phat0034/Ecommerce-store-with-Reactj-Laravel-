<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;
    protected $table = 'wishlist';
    protected $fillable = ['user_id', 'product_id'];
    public $timestamps = false;
    public function items()
    {
        return $this->hasMany(orderdetails::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
