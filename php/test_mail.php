<?php
$to = 'adelinachirtes@hotmail.com';
$subject = 'Test mail';
$message = 'Aceasta este o scrisoare de test pentru a verifica funcția mail() în PHP.';
$headers = 'From: webmaster@example.com' . "\r\n" .
           'Reply-To: webmaster@example.com' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $message, $headers)) {
    echo 'Email trimis cu succes!';
} else {
    echo 'A apărut o problemă la trimiterea emailului.';
}
?>
