// Select all sections to animate
const sections = document.querySelectorAll('.about-section, .skills-expl, .skills-section, .project-section, .contact-section');

// Create the Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add 'visible' class when in view
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of the section is visible
});

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});