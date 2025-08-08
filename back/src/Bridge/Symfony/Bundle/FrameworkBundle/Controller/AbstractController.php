<?php

namespace App\Bridge\Symfony\Bundle\FrameworkBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as SymfonyAbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class AbstractController extends SymfonyAbstractController
{
    /**
     * @param array<string, string> $headers
     * @param array<string, string> $context
     */
    protected function jsonSuccessResponse(
        mixed $data,
        int $status = Response::HTTP_OK,
        array $headers = [],
        array $context = [],
    ): JsonResponse {
        return $this->json(
            [
                'success' => true,
                'data' => $data,
            ],
            $status,
            $headers,
            $context
        );
    }

    /**
     * @param array<string, string> $headers
     * @param array<string, string> $context
     */
    protected function jsonErrorResponse(
        string $message,
        int $status = Response::HTTP_INTERNAL_SERVER_ERROR,
        array $headers = [],
        array $context = [],
    ): JsonResponse {
        return $this->json(
            [
                'success' => false,
                'error' => $message,
            ],
            $status,
            $headers,
            $context
        );
    }

    /**
     * @param array<string, string> $headers
     * @param array<string, string> $context
     */
    protected function jsonNotFoundResponse(
        string $message,
        int $status = Response::HTTP_NOT_FOUND,
        array $headers = [],
        array $context = [],
    ): JsonResponse {
        return $this->json(
            [
                'success' => false,
                'error' => $message,
            ],
            $status,
            $headers,
            $context
        );
    }
}
