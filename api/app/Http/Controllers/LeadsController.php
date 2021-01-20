<?php namespace App\Http\Controllers;


namespace App\Http\Controllers;

use App\Models\Lead;
use App\Transformers\LeadTransformer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use Validator;
use League\Fractal;


class LeadsController extends Controller
{

    /**
     * @var Manager
     */
    private $fractal;

    /**
     * @var LeadTransformer
     */
    private $leadTransformer;

    function __construct(Manager $fractal, LeadTransformer $leadTransformer)
    {
        $this->fractal = $fractal;
        $this->leadTransformer = $leadTransformer;
    }

    /**
     * Find the nearest city based on the provided lat / lng
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse {

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:200',
            'email' => 'required|max:200',
            'phone' => 'required|max:100',
            'extra' => 'max:1000',
            'location_id' => 'required|integer',
            'service_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);

        }

        $input = [
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'phone' => $request->get('phone'),
            'more_info' => $request->get('extra'),
            'location_id' => $request->get('location_id'),
            'service_id' => $request->get('service_id'),
        ];

        Lead::create($input);

        return response()->json([
            'status'    =>  true
        ]);
    }

    public function all() {
        $leads = Lead::with('service', 'location')->get();
        return response()->collection($leads, new LeadTransformer());
    }

    public function one($id) {
        $lead = Lead::with('service', 'location')->findOrFail($id);
        return response()->item($lead, new LeadTransformer());
    }

    public function purchase($id) {
        $lead = Lead::with('service', 'location')->findOrFail($id);
        return response()->item($lead, new LeadTransformer(false));
    }
}
