<?php

namespace App\Bridge\Symfony\Bundle\FrameworkBundle\Controller;

use App\Exception\BadJsonBodyException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as SymfonyAbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\SerializerInterface;

class AbstractController extends SymfonyAbstractController
{
    /**
     * @param array<string, mixed> $params
     * @param class-string         $class
     *
     * @throws NotFoundExceptionInterface
     * @throws ContainerExceptionInterface
     * @throws BadJsonBodyException
     */
    protected function mapRequestContent(?string $class = null, array $params = []): object
    {
        /** @var RequestStack $requestStack */
        $requestStack = $this->container->get('request_stack');
        /** @var Request $request */
        $request = $requestStack->getCurrentRequest();
        $content = json_decode($request->getContent(), true);

        if (!$content || !is_array($content)) {
            throw new BadJsonBodyException();
        }

        $content = (object) array_merge($content, $params);

        if (null === $class || '' === $class || '0' === $class) {
            return $content;
        }

        try {
            /** @var SerializerInterface $serializer */
            $serializer = $this->container->get('serializer');
            /** @var object $object */
            $object = $serializer->deserialize(json_encode($content), $class, 'json');

            return $object;
        } catch (\Exception | ExceptionInterface) {
            throw new BadJsonBodyException();
        }
    }

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
