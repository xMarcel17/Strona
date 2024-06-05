<?php
// Ustawienia
$to_email = "adres@twojejfirmy.pl"; // Adres e-mail, na który ma zostać wysłana wiadomość
$subject = "Nowa wiadomość od użytkownika"; // Temat wiadomości

// Pobierz dane z formularza
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Treść wiadomości
$email_body = "Od: $name\n";
$email_body .= "Email: $email\n\n";
$email_body .= "Wiadomość:\n$message\n";

// Nagłówki
$headers = "From: $email\n";
$headers .= "Reply-To: $email\n";
$headers .= "Content-Type: text/plain; charset=utf-8\n";

// Wysyłanie wiadomości
@mail($to_email, $subject, $email_body, $headers);

// Wysłano pomyślnie
http_response_code(200);
echo "Wiadomość została wysłana pomyślnie.";
?>
