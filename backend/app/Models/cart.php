<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = 'cart';
    protected $fillable = ['user_id'];
    public $timestamps = false;
    public function items()
    {
        return $this->hasMany(cartitems::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
