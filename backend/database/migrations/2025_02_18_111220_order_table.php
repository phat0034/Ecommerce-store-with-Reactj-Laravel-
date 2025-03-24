<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Nếu user đăng nhập
            $table->string('name_order', 255);
            $table->string('address_order', 255);
            $table->string('email_order', 255);
            $table->string('phone_order', 20);
            $table->decimal('totalprice', 10, 2); // Giá sản phẩm lúc thêm vào giỏ
            $table->string('payment_method', 50); // ?????????????????
            $table->enum('status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending'); // ??????????????
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            // Ràng buộc khóa ngoại
            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
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
