<?php namespace App\Http\Controllers;


namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class LocationsController extends Controller
{

    /**
     * Get locations with a possible query param to search
     * @param Request $request
     * @return JsonResponse
     */
    public function list(Request $request): JsonResponse {

        $query = $request->get('q');
        if ($query) {
            $locations = Location::whereRaw("name like '$query%'")->get();
        } else {
            $locations = Location::all();
        }

        $locationsFormatted = [];
        foreach ($locations as $location) {
            $locationsFormatted[] = [
                'value' => $location->id,
                'text' => $location->name,
            ];
        }

        return response()->json($locationsFormatted);
    }

}



