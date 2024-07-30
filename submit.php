<?php
// Set the content type to JSON for the response
header('Content-Type: application/json');

$response = [];
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and trim input data to prevent XSS attacks and remove extra spaces
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $subject = htmlspecialchars(trim($_POST["subject"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    $errors = [];

    // Validate name: check if it is empty
    if (empty($name)) {
        $errors[] = "Name is required.";
    }

    // Validate email: check if it is empty or not a valid email format
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required.";
    }

    // Validate subject: check if it is empty
    if (empty($subject)) {
        $errors[] = "Subject is required.";
    }

    // Validate message: check if it is empty
    if (empty($message)) {
        $errors[] = "Message is required.";
    }

    // Check if there are any validation errors
    if (empty($errors)) {
        // If no errors, set the response status to success and include a thank you message
        $response['status'] = 'success';
        $response['message'] = "Thank you for your message, $name. We will get back to you shortly.";
    } else {
        // If there are errors, set the response status to error and include the error messages
        $response['status'] = 'error';
        $response['message'] = implode("<br>", $errors);
    }
}

// Encode the response array to JSON format and output it
echo json_encode($response);
?>
