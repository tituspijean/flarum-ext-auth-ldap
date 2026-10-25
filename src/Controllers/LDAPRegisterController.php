<?php
namespace tituspijean\Flarum\Auth\LDAP\Controllers;

use Flarum\Api\Client;
use Flarum\Http\RememberAccessToken;
use Flarum\Http\Rememberer;
use Flarum\Http\SessionAuthenticator;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;

class LDAPRegisterController implements RequestHandlerInterface
{
    public function __construct(
        protected Client $api,
        protected SessionAuthenticator $authenticator,
        protected Rememberer $rememberer
    ) {
    }

    public function handle(Request $request): ResponseInterface
    {
        $attributes = $request->getParsedBody() ?? [];
        $params = ['data' => ['type' => 'users', 'attributes' => $attributes]];
        /*
         * Prevent LDAP Registration with blank email bypass
         * 
         * Oddly the Required Email Validation does not invoke, but the
         * Error Code 422 - "The email field must be a valid email address."
         * do appear, when entering an invalid email. This could be a Flarum v2.0 Beta 3 bug, 
         * because email is not an optional field for the banned account system.
         */
        if (array_key_exists('email', $attributes) && empty($attributes['email'])) {
            $contents = ["errors" => [
                [
                    "status" => "422",
                    "code" => "validation_error",
                    "source" => [
                        "pointer" => "\/data\/attributes\/email"
                    ],
                    "detail" => "The email field is required."
                ]
            ]];
            return new JsonResponse($contents, 422);
        }
        $response = $this->api->withParentRequest($request)->withBody($params)->post('/users');

        $body = json_decode($response->getBody(), associative: false);

        if (isset($body->data)) {
            $userId = $body->data->id;

            $token = RememberAccessToken::generate($userId);

            $session = $request->getAttribute('session');
            $this->authenticator->logIn($session, $token);

            $response = $this->rememberer->remember($response, $token);
        }
        return $response;
    }
}