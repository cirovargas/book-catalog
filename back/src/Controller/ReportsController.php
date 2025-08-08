<?php

namespace App\Controller;

use App\Service\Reports\BooksByAuthorReportService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReportsController extends AbstractController
{
    #[Route('/api/reports/books-by-author', name: 'report_books_by_author')]
    public function booksByAuthor(BooksByAuthorReportService $booksByAuthorReportService): Response
    {
        return new Response(
            $booksByAuthorReportService->generate(),
            \Symfony\Component\HttpFoundation\Response::HTTP_OK,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="relatorio_autores.pdf"',
            ]
        );
    }
}
