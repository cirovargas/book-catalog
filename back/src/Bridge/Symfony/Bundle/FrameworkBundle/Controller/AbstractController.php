<?php

namespace App\Bridge\Symfony\Bundle\FrameworkBundle\Controller;

use App\Exception\BadJsonBodyException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as SymfonyAbstractController;
use Symfony\Component\HttpFoundation\Response;

class AbstractController extends SymfonyAbstractController
{
    protected function getRequestContent(string $class = null, array $params = []): object
    {
        $request = $this->container->get('request_stack')->getCurrentRequest();
        $content = json_decode($request->getContent(), true);

        if (!$content) {
            throw new BadJsonBodyException();
        }

        $content = (object)array_merge($content, $params);

        if (!$class) {
            return $content;
        }

        try {
            $object = $this->container->get('serializer')->deserialize(json_encode($content), $class, 'json');
            return $object;
        } catch (\Exception $e) {
            throw new BadJsonBodyException();
        }

    }

    protected function jsonSuccessResponse(
        $data,
        int $status = Response::HTTP_OK,
        array $headers = [],
        array $context = []
    ): JsonResponse {
        return $this->json(
            [
            'success' => true,
            'data' => $data
            ], $status, $headers, $context
        );
    }

    protected function jsonErrorResponse(
        $message,
        int $status = Response::HTTP_INTERNAL_SERVER_ERROR,
        array $headers = [],
        array $context = []
    ): JsonResponse {
        return $this->json(
            [
            'success' => false,
            'error' => $message,
            ], $status, $headers, $context
        );
    }

    protected function jsonNotFoundResponse(
        $message,
        int $status = Response::HTTP_NOT_FOUND,
        array $headers = [],
        array $context = []
    ): JsonResponse {
        return $this->json(
            [
            'success' => false,
            'error' => $message,
            ], $status, $headers, $context
        );
    }
}
