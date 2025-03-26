<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Typeproduct extends Model
{
    protected $table = 'typeproduct';
    protected $fillable = [
        'name',

    ];
    public $timestamps = false;
}
