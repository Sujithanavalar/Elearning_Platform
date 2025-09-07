document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('section');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    const body = document.body;
    const enrollButtons = document.querySelectorAll('.enroll-btn');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const sunIcon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
    const moonIcon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(`theme-${currentTheme}`);
    themeIcon.innerHTML = currentTheme === 'dark' ? moonIcon : sunIcon;
    themeIconMobile.innerHTML = currentTheme === 'dark' ? moonIcon : sunIcon;

    const toggleTheme = () => {
        if (body.classList.contains('theme-dark')) {
            body.classList.replace('theme-dark', 'theme-light');
            themeIcon.innerHTML = sunIcon;
            themeIconMobile.innerHTML = sunIcon;
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('theme-light', 'theme-dark');
            themeIcon.innerHTML = moonIcon;
            themeIconMobile.innerHTML = moonIcon;
            localStorage.setItem('theme', 'dark');
        }
    };

    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        menuOpenIcon.classList.toggle('hidden');
        menuCloseIcon.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuOpenIcon.classList.remove('hidden');
            menuCloseIcon.classList.add('hidden');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        highlightCurrentSection();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            } else {
                window.location.href = targetId;
            }
        });
    });

    function highlightCurrentSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });

        mobileNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    enrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = isLoggedIn ? 'dashboard.html' : 'signup.html';
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });

    highlightCurrentSection();
});
