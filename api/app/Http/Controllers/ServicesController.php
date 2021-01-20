<?php namespace App\Http\Controllers;


namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class ServicesController extends Controller
{

    /**
     * Get services with a possible query param to search
     * @param Request $request
     * @return JsonResponse
     */
    public function list(Request $request): JsonResponse {

        $query = $request->get('q');
        if ($query) {
            $services = Service::whereRaw("name like '$query%'")->get();
        } else {
            $services = Service::all();
        }

        $servicesFormatted = [];
        foreach ($services as $service) {
            $servicesFormatted[] = [
                'value' => $service->id,
                'text' => $service->name,
            ];
        }

        return response()->json($servicesFormatted);
    }

}



