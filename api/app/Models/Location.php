<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Location
 * @package App\Models
 * @property int $id
 * @property string $name
 * @property string $slug
 */
class Location extends Model
{
    protected $table = 'locations';

}