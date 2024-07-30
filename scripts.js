// highlight navigation bar for each section when scrolling
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});


// Add an event listener for form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object from the form
    const formData = new FormData(this);

    // Send the form data using fetch to the submit.php file via POST request
    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        if (data.status === 'success') { // If the response status is success
            alert(data.message); // Show a success message
            document.getElementById('contactForm').reset(); // Reset form fields
        } else {
            alert(data.message); // Show an error message if not successful
        }
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors
    });
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smoothly scroll to the top
}

// Show back to top button when scrolled down
window.onscroll = function() {
    const backToTopButton = document.getElementById('backToTop');
    // Display the button if scrolled more than 100px
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none'; // Hide the button if scrolled less than 100px
    }
};
