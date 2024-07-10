<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Completați toate câmpurile.";
        exit;
    }

    $recipient = "destinatar@example.com"; // Schimbă cu adresa ta de email
    $subject = "Mesaj nou de la $name";

    $email_content = "Nume: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mesaj:\n$message\n";

    $email_headers = "From: $name <$email>";

    // Debug: log email details
    error_log("Email details: Recipient=$recipient, Subject=$subject, Content=$email_content, Headers=$email_headers");

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Mesajul a fost trimis.";
    } else {
        // Debug: log error
        error_log("Email sending failed: Recipient=$recipient, Subject=$subject, Content=$email_content, Headers=$email_headers");
        http_response_code(500);
        echo "A apărut o problemă la trimiterea mesajului.";
    }

} else {
    http_response_code(403);
    echo "Acces interzis.";
}
?>
