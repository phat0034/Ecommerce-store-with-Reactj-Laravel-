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
        Schema::create('address', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Nếu user đăng nhập
            $table->string('title_address', 255);
            $table->string('name_address', 255);
            $table->string('address_delevery', 255);
            $table->string('email_address', 255);
            $table->string('phone_address', 255);
            $table->enum('set_address', ['yes', 'no'])->default('yes'); // ??????????????
            // Khóa ngoại nếu có hệ thống user
            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('address');
    }
};
