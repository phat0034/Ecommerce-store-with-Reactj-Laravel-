<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orderdetails', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id'); // Liên kết với giỏ hàng
            $table->unsignedBigInteger('product_id'); // Liên kết với sản phẩm
            $table->integer('order_quantity')->default(1);
            $table->string('product_name', 255);
            $table->decimal('product_price', 20, 2); // Giá sản phẩm lúc thêm vào giỏ
            // Khóa ngoại nếu có hệ thống user
            $table->foreign('order_id')->references('id')->on('order')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('product')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order');
    }
};
