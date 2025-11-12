module.exports = {
    content: [
        './index.html',
        './src/Pages/**/*.html',
        './src/assets/js/**/*.js'
    ],
    css: ['./src/assets/css/style.css'],
    output: './src/assets/css',
    safelist: {
        standard: [
            // Estados dinámicos o añadidos por JS
            'scrolled',
            'animate',

            // Clases de animación usadas en HTML/JS
            'fade-in-up',
            'slide-in-left',
            'slide-in-right',
            'scale-in',
            'rotate-in',

            // Clases creadas/agregadas por JS para badges y scroll
            'badge-toggle',
            'scroll-arrow',
            'arrow-up',
            'arrow-down',
            'scroll-decorated',
            'has-top',
            'has-bottom',

            // Otros helpers específicos
            'portfolio-carousel-btn',
            'portfolio-slide',
            'project-card',

            // Utilidades Bootstrap que pueden aplicarse condicionalmente
            'd-none',
            'show',
            'fade',
            'collapsing',
            'collapse',
            'active',
            'disabled',
            'modal', 'modal-open', 'modal-backdrop',
            'tooltip', 'popover',
            'dropdown', 'dropdown-menu', 'dropdown-item',
            'offcanvas', 'offcanvas-backdrop',
            'toast', 'showing',

            // Carousel / indicators si se generan dinámicamente
            'carousel', 'carousel-item', 'carousel-indicators', 'carousel-control-prev', 'carousel-control-next'
        ],
        greedy: [
            // Mantener cualquier variante que empiece con estas clases
            /^modal-/,
            /^carousel-/,
            /^navbar-/,
            /^badge/,
            /^btn-/,
            /^alert-/,
            /^text-/,
            /^bg-/,
            /^col-/,
            /^row$/
        ]
    }
};
