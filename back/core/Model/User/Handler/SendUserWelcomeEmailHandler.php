<?php

namespace DDD\Model\User\Handler;

use DDD\Application\Service\Mailer;
use DDD\Model\User\Command\SendUserWelcomeEmailCommand;

class SendUserWelcomeEmailHandler
{
    public function __construct(private readonly Mailer $mailer)
    {
    }

    public function __invoke(SendUserWelcomeEmailCommand $command): void
    {
        $subject = 'Bem-vindo ao Sistema - Credenciais de Acesso';

        $body = sprintf(
            '
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                    .credentials { background-color: #e0e7ff; padding: 15px; border-left: 4px solid #4F46E5; margin: 20px 0; }
                    .credentials strong { color: #4F46E5; }
                    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
                    .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Bem-vindo(a) ao Sistema!</h1>
                    </div>
                    <div class="content">
                        <p>Olá <strong>%s</strong>,</p>
                        
                        <p>Sua conta foi criada com sucesso! Você já pode acessar o sistema com as credenciais abaixo:</p>
                        
                        <div class="credentials">
                            <p><strong>E-mail / Login:</strong> %s</p>
                            <p><strong>Senha Temporária:</strong> %s</p>
                        </div>
                        
                        <p><strong>⚠️ Importante:</strong> Por questões de segurança, recomendamos que você altere sua senha no primeiro acesso.</p>
                        
                        <p>Para acessar o sistema, utilize o link abaixo:</p>
                        <p style="text-align: center;">
                            <a href="http://localhost:5173" class="button">Acessar o Sistema</a>
                        </p>
                        
                        <p>Se você tiver qualquer dúvida ou precisar de ajuda, entre em contato com o suporte.</p>
                        
                        <p>Atenciosamente,<br>Equipe do Sistema</p>
                    </div>
                    <div class="footer">
                        <p>Este é um e-mail automático, por favor não responda.</p>
                    </div>
                </div>
            </body>
            </html>
            ',
            htmlspecialchars($command->getName() ?? 'Usuário', \ENT_QUOTES, 'UTF-8'),
            htmlspecialchars($command->getEmail(), \ENT_QUOTES, 'UTF-8'),
            htmlspecialchars($command->getPlainPassword(), \ENT_QUOTES, 'UTF-8')
        );

        $this->mailer->send(
            $command->getEmail(),
            $subject,
            $body
        );
    }
}
