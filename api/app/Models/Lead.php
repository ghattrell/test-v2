<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Class Lead
 * @package App\Models
 * @property int $id
 * @property string $name
 * @property string $slug
 */
class Lead extends Model
{
    protected $table = 'leads';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'more_info',
        'location_id',
        'service_id'
    ];

    public function service(): HasOne
    {
        return $this->hasOne(Service::class, 'id', 'service_id');
    }


    public function location(): HasOne
    {
        return $this->hasOne(Location::class, 'id', 'location_id');
    }

}