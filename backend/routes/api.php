<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PortfolioController;

Route::get('/profile', [PortfolioController::class, 'getProfile']);
Route::get('/projects', [PortfolioController::class, 'getProjects']);
Route::get('/skills', [PortfolioController::class, 'getSkills']);
Route::post('/contact', [PortfolioController::class, 'storeContact']);
