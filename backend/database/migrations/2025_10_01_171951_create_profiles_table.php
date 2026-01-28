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
       Schema::create('profiles', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('title');
    $table->text('bio');
    $table->text('philosophy')->nullable();
    $table->string('image')->nullable();
    $table->string('email');
    $table->string('github')->nullable();
    $table->string('linkedin')->nullable();
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
