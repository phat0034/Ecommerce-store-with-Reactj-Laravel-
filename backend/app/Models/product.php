<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $table = 'product';
    protected $fillable = [
        'namepd',
        'price',
        'saleprice',
        'idtype',
        'img'
    ];
    public $timestamps = false;
}
