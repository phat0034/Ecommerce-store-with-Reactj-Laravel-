<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PayPal\Api\Payer;
use PayPal\Api\Amount;
use PayPal\Api\Transaction;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\PaymentExecution;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PayPalController extends Controller
{
    private function getAccessToken()
    {
        try {
            $clientId = config('paypal.client_id');
            $secret = config('paypal.secret');

            // Check if credentials exist
            if (empty($clientId) || empty($secret)) {
                throw new \Exception('PayPal API credentials are not configured');
            }

            $response = Http::withBasicAuth($clientId, $secret)
                ->asForm()
                ->post('https://api-m.sandbox.paypal.com/v1/oauth2/token', [
                    'grant_type' => 'client_credentials'
                ]);

            // Check if the request was successful
            if ($response->failed()) {
                throw new \Exception('Failed to get PayPal access token: ' . $response->body());
            }

            $responseData = $response->json();

            // Check if access token exists in the response
            if (!isset($responseData['access_token'])) {
                throw new \Exception('Access token not found in PayPal response');
            }

            return $responseData['access_token'];
        } catch (\Exception $e) {
            // Log the error
            error_log('PayPal getAccessToken error: ' . $e->getMessage());
            throw $e; // Re-throw to be handled by the calling method
        }
    }
    public function createOrder(Request $request)
    {
        // Log the incoming request
        Log::info('PayPal create order request', [
            'payload' => $request->all(),
            'total_type' => gettype($request->total),
            'total_value' => $request->total
        ]);

        try {
            $accessToken = $this->getAccessToken();

            // Force the value to be a proper float
            $total = floatval($request->total);
            $amountValue = number_format($total, 2, '.', '');

            Log::info('Formatted amount', ['amount' => $amountValue]);

            $requestData = [
                "intent" => "CAPTURE",
                "purchase_units" => [
                    [
                        "reference_id" => "default",
                        "amount" => [
                            "currency_code" => "USD",
                            "value" => $amountValue
                        ]
                    ]
                ]
            ];

            // Log the data being sent to PayPal
            Log::info('PayPal request data', ['data' => $requestData]);

            $response = Http::withToken($accessToken)
                ->post('https://api-m.sandbox.paypal.com/v2/checkout/orders', data: $requestData);

            // Log the response from PayPal
            Log::info('PayPal response', ['response' => $response->json()]);

            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('PayPal error', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function captureOrder($orderId)
    {
        try {
            Log::info("🟢 Capture Order Request for Order ID: {$orderId}");

            // Lấy access token
            $accessToken = $this->getAccessToken();
            Log::info("🟢 PayPal Access Token: " . substr($accessToken, 0, 10) . "..."); // Ẩn bớt token

            // Gửi request đến PayPal để capture order
            $response = Http::withToken($accessToken)
                ->withBody('{}', 'application/json') // 👈 Ép JSON body đúng format
                ->post("https://api-m.sandbox.paypal.com/v2/checkout/orders/{$orderId}/capture");

            $jsonResponse = $response->json();
            Log::info("🟢 PayPal Capture Response: " . json_encode($jsonResponse));

            // Kiểm tra nếu request thất bại
            if ($response->failed()) {
                Log::error("🔴 PayPal Capture Failed: " . json_encode($jsonResponse));
                return response()->json([
                    'success' => false,
                    'message' => 'PayPal capture failed',
                    'paypal_response' => $jsonResponse
                ], $response->status());
            }

            Log::info("✅ PayPal Capture Successful!");
            return response()->json($jsonResponse);
        } catch (\Exception $e) {
            Log::error("🔴 Exception in captureOrder: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Exception during PayPal capture',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
