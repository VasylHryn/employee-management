<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmployeeController;

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('/employee', EmployeeController::class);
