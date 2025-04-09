<?php

namespace App\Service\Reports;

use App\Entity\BooksByAuthor;
use Doctrine\ORM\EntityManagerInterface;
use Dompdf\Dompdf;
use Dompdf\Options;

class BooksByAuthorReportService
{

    public function __construct(
        private EntityManagerInterface $em,
        private \Twig\Environment $twig
    ) {
    }

    public function generate(): string
    {
        $authors = $this->em->getRepository(BooksByAuthor::class)->findAll();

        $html = $this->twig->render(
            'reports/books_by_author.html.twig', [
            'authors' => $authors
            ]
        );

        $pdfOptions = new Options();
        $pdfOptions->set('defaultFont', 'Arial');

        $dompdf = new Dompdf($pdfOptions);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        return $dompdf->output();
    }

}
