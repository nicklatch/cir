<?php

use App\Enums\RaceClass;
use App\Models\Driver;
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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Driver::class);
            $table->enum('class', RaceClass::values());
            $table->unsignedInteger('week');
            $table->unsignedInteger('draw_one');
            $table->unsignedInteger('draw_two');
            $table->unsignedInteger('draw_three')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
