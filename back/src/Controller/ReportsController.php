<?php

namespace App\Controller;

use App\Service\Reports\BooksByAuthorReportService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/reports')]
class ReportsController extends AbstractController
{
    #[Route('/books-by-author', name: 'report_books_by_author')]
    public function booksByAuthor(BooksByAuthorReportService $booksByAuthorReportService): Response
    {
        return new Response(
            $booksByAuthorReportService->generate(),
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="relatorio_autores.pdf"',
            ]
        );
    }
}
