const navbarShrink = () => {
    const navbar = document.querySelector('#mainNav');
    if (!navbar) return;

    if (window.scrollY === 0) {
        navbar.classList.remove('navbar-shrink');
    } else {
        navbar.classList.add('navbar-shrink');
    }
};


const setupSmoothScroll = () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {

        if (!link.classList.contains('no-scroll')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });

        }

    });
};


const setupScrollSpy = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
};


navbarShrink();
document.addEventListener('scroll', navbarShrink);
setupSmoothScroll();
setupScrollSpy();



    function initMap() {
        const location = { lat: 10.001323540322467, lng: -84.11481703308019 };
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: location,
        });

        const marker = new google.maps.Marker({
            position: location,
            map: map,
        });
    }
