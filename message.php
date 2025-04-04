<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Send email (make sure to configure the mail server on your hosting)
    $to = "youremail@example.com";
    $subject = "New Contact Form Submission";
    $body = "You have received a new message from $name ($email):\n\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for contacting us! We'll get back to you soon.";
    } else {
        echo "There was an error sending your message. Please try again later.";
    }
}
?>
