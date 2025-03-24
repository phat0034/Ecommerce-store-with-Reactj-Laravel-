<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class TypeProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tạo các loại sản phẩm
        $types = [
            ['name' => 'Gaming'],
            ['name' => 'Healthy'],
            ['name' => 'Skincare'],
            ['name' => 'Makeup'],
            ['name' => 'Electronic'],
            ['name' => 'Gia dụng'],
            ['name' => 'Quần áo'],
        ];

        DB::table('typeproduct')->insert($types);
    }
}
