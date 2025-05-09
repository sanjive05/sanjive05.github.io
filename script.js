// script.js

document.addEventListener('DOMContentLoaded', function() {
    fetch('logos.json')
        .then(response => response.json())
        .then(logos => {
            // Render logos for skills section
            const skillsList = document.getElementById('skillsList');
            if (skillsList) {
                skillsList.querySelectorAll('[data-skill]').forEach(item => {
                    const skillName = item.dataset.skill;
                    const logoUrl = logos[skillName];
                    const placeholder = item.querySelector('.logo-placeholder');
                    if (logoUrl && placeholder) {
                        const img = document.createElement('img');
                        img.src = logoUrl;
                        img.alt = skillName;
                        img.classList.add('tech-logo');
                        placeholder.appendChild(img);
                    }
                });
            }

            // Render logos for social links in hero section using placeholders
            const socialLinksContainer = document.getElementById('socialLinks');
            if (socialLinksContainer) {
                const socialMedia = [
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sanjive-subramaniam/' },
                    { name: 'GitHub', url: 'https://github.com/sanjive05' },
                    { name: 'LeetCode', url: 'https://leetcode.com/u/sanjive05/' }
                ];

                socialLinksContainer.querySelectorAll('[data-skill]').forEach(item => {
                    const skillName = item.dataset.skill;
                    const logoUrl = logos[skillName];
                    const placeholder = item.querySelector('.logo-placeholder');

                    if (logoUrl && placeholder) {
                        const link = document.createElement('a');
                        link.href = socialMedia.find(sm => sm.name === skillName)?.url || '#';
                        link.target = '_blank';

                        const img = document.createElement('img');
                        img.src = logoUrl;
                        img.alt = skillName;
                        img.classList.add('social-icon');

                        link.appendChild(img);
                        placeholder.parentNode.replaceChild(link, placeholder);
                    }
                });
            }

            // Smooth scrolling for navigation links
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Basic form submission handling
            const contactForm = document.querySelector('#contact form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    alert('Your message has been sent! (This is a simulation)');
                    contactForm.reset();
                });
            }
        })
        .catch(error => {
            console.error('Error fetching logos:', error);
        });
});