<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Пути к файлам библиотеки (зависит от того, куда вы их скачали)
// require '/scripts/Exception.php';
// require '/scripts/PHPMailer.php';
// require '/scripts/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Настройки сервера Яндекс
    $mail->isSMTP();
    $mail->Host       = 'smtp.yandex.ru';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'chess-pocht@ya.ru'; // Ваша почта
    $mail->Password   = 'wrwtmjcqnezpesec'; // ПАРОЛЬ ПРИЛОЖЕНИЯ из Шага 1
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    // Получатель и отправитель
    $mail->setFrom('chess-pocht@ya.ru', 'Сообщения с моего сайта'); 
    $mail->addAddress('chess-pocht@ya.ru'); // Куда вам должно прийти письмо

    // Контент письма
    $mail->Body = "<b>Новое сообщение из чата:</b><br><br>" . nl2br($user_msg);
    $mail->isHTML(false);
    $mail->Subject = 'Новое сообщение из чата';
    $mail->Body    = "От: $user_email\n\nТекст сообщения:\n$user_msg";

    $mail->send();
      // Красивое сообщение и редирект
     echo "<div style='font-family: sans-serif; text-align: center; margin-top: 100px;'>
            <h2 style='color: #007aff;'>✅ Отправлено!</h2>
            <p>Сейчас вы вернетесь обратно на сайт...</p>
          </div>";
    
    // Перенаправление на why.html через 3 секунды
    header("refresh:3;url=why.html"); 
    exit(); 
} catch (Exception $e) {
    echo "Ошибка при отправке: {$mail->ErrorInfo}. <br><a href='why.html'>Вернуться назад и попробовать снова</a>";
}
?>
```

### Почему именно так?
*   **Через SMTP письма не попадают в спам**, так как Яндекс видит, что это «официальный» вход в ваш аккаунт.
*   **Пароль приложения** защищает вашу основную учетную запись: если код сайта украдут, злоумышленники не получат полный доступ к вашему Яндекс ID.
*   **Порт 465** с шифрованием SSL — стандарт безопасности для Яндекс Почты в 2026 году.
