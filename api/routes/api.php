<?php

use Illuminate\Http\Request;

/*
|
|
|              /)-_-(\
|               (o o)
|       .-----__/\o/
|      /  __      /
|  \__/\ /  \_\ |/
|       \\     ||
|       //     ||
|       |\     |\
|
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
|
|
*/

Route::post('leads','LeadsController@create');
Route::get('leads','LeadsController@all');
Route::get('leads/{id}','LeadsController@one');
Route::post('leads/{id}/purchase','LeadsController@purchase');

Route::get('services','ServicesController@list');
Route::get('locations','LocationsController@list');

