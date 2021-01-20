<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Service
 * @package App\Models
 * @property int $id
 * @property string $name
 * @property string $slug
 */
class Service extends Model
{
    protected $table = 'services';

}