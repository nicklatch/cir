<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        if (config('database.default') === 'sqlite') {
            $db = DB::connection(config('database.default'))->getPdo();
            // Use the Write-Ahead Logging (WAL) journal mode for better performance and concurrency.
            $db->exec('PRAGMA journal_mode = wal;');
            // Synchronize less often to the filesystem for better performance, while still maintaining database consistency.
            $db->exec('PRAGMA synchronous = normal;');
            // Enable foreign key constraints for data integrity, though this may have a slight performance impact.
            $db->exec('PRAGMA foreign_keys = on;');
            // Store temporary files in memory for better performance.
            $db->exec('PRAGMA temp_store = memory;');
            // Regularly vacuum the database to reclaim space from deleted data.
            $db->exec('PRAGMA auto_vacuum = incremental;');
            $db->exec('PRAGMA incremental_vacuum;');
        }

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
