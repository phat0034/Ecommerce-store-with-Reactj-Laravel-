<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cartitems', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cart_id'); // Liên kết với giỏ hàng
            $table->unsignedBigInteger('product_id'); // Liên kết với sản phẩm
            $table->integer('quantity')->default(1);
            $table->decimal('price', 10, 2); // Giá sản phẩm lúc thêm vào giỏ
          
            // Ràng buộc khóa ngoại
            $table->foreign('cart_id')->references('id')->on('cart')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('product')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
