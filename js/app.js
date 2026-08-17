// --- Navbar: fondo sólido al hacer scroll ---
const navbar = document.getElementById('navbar');

function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


// --- Menú móvil ---
const menuButton = document.getElementById('menuButton');
const navLinks = document.getElementById('navLinks');

menuButton.addEventListener('click', () => {
    const isOpen = navbar.getAttribute('data-open') === 'true';

    navbar.setAttribute('data-open', String(!isOpen));
    menuButton.classList.toggle('open', !isOpen);
    menuButton.setAttribute('aria-expanded', String(!isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navbar.setAttribute('data-open', 'false');
        menuButton.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
    });
});


// --- Revelado al hacer scroll ---
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

revealItems.forEach((item) => revealObserver.observe(item));


// --- Productos: abrir la vista en 3D ---
// Actualiza el mockup de realidad aumentada con el producto elegido
// y baja hasta la sección de experiencia. Sustituye el bloque de
// "visor 3D real" por tu navegación real cuando esté disponible.
const productCards = document.querySelectorAll('.product-card');
const camaraImagen = document.getElementById('camaraImagen');
const camaraNombre = document.getElementById('camaraNombre');
const camaraPrecio = document.getElementById('camaraPrecio');

function verProducto(id) {
    const tarjeta = productCards[id - 1];

    if (tarjeta) {
        const { image, alt, name, price } = tarjeta.dataset;

        if (camaraImagen && image) {
            camaraImagen.src = image;
            camaraImagen.alt = `Vista previa de realidad aumentada del modelo ${name}`;
        }
        if (camaraNombre && name) camaraNombre.textContent = name;
        if (camaraPrecio && price) camaraPrecio.textContent = price;
    }

    const destino = document.getElementById('experiencia');
    if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
    }
}


// --- Realidad aumentada ---
// Reemplaza esta función por la llamada real al SDK de RA
// (WebXR, model-viewer, etc.) cuando esté integrado.
function demoRA() {
    const boton = document.getElementById('camaraColocar');
    if (boton) {
        boton.textContent = 'Abriendo cámara…';
        window.setTimeout(() => {
            boton.textContent = 'Colocar en mi espacio';
        }, 1800);
    }
    document.getElementById('experiencia')?.scrollIntoView({ behavior: 'smooth' });
}


// --- Modal de cuenta: iniciar sesión / crear cuenta ---
const accountButton = document.getElementById('accountButton');
const accountOverlay = document.getElementById('accountOverlay');
const accountModal = document.getElementById('accountModal');
const accountClose = document.getElementById('accountClose');

const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const panelLogin = document.getElementById('panelLogin');
const panelRegister = document.getElementById('panelRegister');

let lastFocusedElement = null;

function openAccountModal(target = 'login') {
    lastFocusedElement = document.activeElement;

    accountOverlay.hidden = false;
    // Un frame para que la transición de opacidad/transform se anime.
    requestAnimationFrame(() => accountOverlay.classList.add('is-open'));

    switchAccountTab(target);
    document.body.style.overflow = 'hidden';

    window.setTimeout(() => {
        accountModal.querySelector('input')?.focus();
    }, 50);
}

function closeAccountModal() {
    accountOverlay.classList.remove('is-open');
    document.body.style.overflow = '';

    window.setTimeout(() => {
        accountOverlay.hidden = true;
    }, 300);

    lastFocusedElement?.focus();
}

function switchAccountTab(target) {
    const isLogin = target === 'login';

    tabLogin.classList.toggle('is-active', isLogin);
    tabRegister.classList.toggle('is-active', !isLogin);
    tabLogin.setAttribute('aria-selected', String(isLogin));
    tabRegister.setAttribute('aria-selected', String(!isLogin));

    panelLogin.hidden = !isLogin;
    panelRegister.hidden = isLogin;
}

accountButton?.addEventListener('click', () => openAccountModal('login'));
accountClose?.addEventListener('click', closeAccountModal);

accountOverlay?.addEventListener('click', (event) => {
    if (event.target === accountOverlay) {
        closeAccountModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !accountOverlay.hidden) {
        closeAccountModal();
    }
});

tabLogin?.addEventListener('click', () => switchAccountTab('login'));
tabRegister?.addEventListener('click', () => switchAccountTab('register'));

document.querySelectorAll('.modal-switch-link').forEach((btn) => {
    btn.addEventListener('click', () => switchAccountTab(btn.dataset.target));
});

// Los envíos son solo de demostración: no hay backend conectado.
// Sustituye esta lógica por la llamada real a tu API de autenticación.
document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('loginFeedback').textContent =
        'Conecta este formulario a tu servicio de autenticación para iniciar sesión de verdad.';
});

document.getElementById('registerForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('registerFeedback').textContent =
        'Conecta este formulario a tu servicio de autenticación para crear la cuenta de verdad.';
});