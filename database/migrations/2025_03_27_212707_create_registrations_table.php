<?php

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
            $table->enum('class', ['open', 'fwd_rubber', 'rwd_rubber', 'powder_puff', 'youngm_guns']);
            $table->unsignedInteger('draw_one');
            $table->unsignedInteger('draw_two');
            $table->unsignedInteger('draw_three');
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
