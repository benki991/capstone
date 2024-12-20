<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'firstname',
        'lastname',
        'contact_no',
        'login_id',
        'usertype_id'
    ];
}
