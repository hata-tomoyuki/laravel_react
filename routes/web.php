<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/tickets', [TicketsController::class, 'index'])->name('tickets.index');
    Route::get('/tickets/create', [TicketsController::class, 'create'])->name('tickets.create');
    Route::get('/tickets/{id}', [TicketsController::class, 'show'])->name('tickets.show');
    Route::post('/tickets', [TicketsController::class, 'store'])->name('tickets.store');
});


require __DIR__.'/auth.php';
