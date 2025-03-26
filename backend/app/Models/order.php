<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'order';
    protected $fillable = ['user_id', 'totalprice', 'name_order', 'address_order', 'email_order', 'phone_order', 'payment_method', 'status'];

    public function items()
    {
        return $this->hasMany(orderdetails::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
