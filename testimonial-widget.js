/**
 * Testimonial Widget
 * Lightweight, embeddable testimonial carousel
 * https://www.handonweb.com
 */
var TestimonialWidget = (function () {
    var COLORS = ['#4a90d9', '#e74c3c', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#34495e', '#f39c12'];

    function getInitials(name) {
        return name.split(' ').map(function (w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
    }

    function getColor(name) {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return COLORS[Math.abs(hash) % COLORS.length];
    }

    function renderStars(rating) {
        var html = '<div class="tw-stars">';
        for (var i = 1; i <= 5; i++) {
            html += '<span class="tw-star' + (i > rating ? ' tw-star-empty' : '') + '">★</span>';
        }
        html += '</div>';
        return html;
    }

    function renderAvatar(t) {
        if (t.photo) {
            return '<img class="tw-avatar" src="' + t.photo + '" alt="' + t.name + '">';
        }
        var initials = getInitials(t.name);
        var color = getColor(t.name);
        return '<div class="tw-initials" style="background:' + color + '">' + initials + '</div>';
    }

    function init(selector) {
        var el = document.querySelector(selector);
        if (!el) return;

        var testimonials = [];
        try {
            testimonials = JSON.parse(el.getAttribute('data-testimonials') || '[]');
        } catch (e) {
            console.error('TestimonialWidget: Invalid JSON in data-testimonials');
            return;
        }

        if (testimonials.length === 0) return;

        var interval = parseInt(el.getAttribute('data-interval')) || 5000;
        var autoRotate = el.getAttribute('data-auto-rotate') !== 'false';
        var current = 0;
        var timer = null;
        var paused = false;

        // Build DOM
        el.innerHTML = '';
        el.classList.add('tw-container');

        var card = document.createElement('div');
        card.className = 'tw-card';

        var starsEl = document.createElement('div');
        var quoteEl = document.createElement('div');
        quoteEl.className = 'tw-quote';

        var authorEl = document.createElement('div');
        authorEl.className = 'tw-author';

        card.appendChild(starsEl);
        card.appendChild(quoteEl);
        card.appendChild(authorEl);
        el.appendChild(card);

        // Dots
        var dotsEl = document.createElement('div');
        dotsEl.className = 'tw-dots';
        testimonials.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.className = 'tw-dot' + (i === 0 ? ' tw-active' : '');
            dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
            dot.addEventListener('click', function () {
                goTo(i);
            });
            dotsEl.appendChild(dot);
        });
        el.appendChild(dotsEl);

        function show(index) {
            var t = testimonials[index];
            starsEl.innerHTML = renderStars(t.rating || 5);
            quoteEl.textContent = '"' + t.text + '"';

            var companyHtml = t.company ? '<div class="tw-author-company">' + t.company + '</div>' : '';
            authorEl.innerHTML = renderAvatar(t) +
                '<div class="tw-author-info">' +
                '<div class="tw-author-name">' + t.name + '</div>' +
                companyHtml +
                '</div>';

            // Update dots
            var dots = dotsEl.querySelectorAll('.tw-dot');
            dots.forEach(function (d, i) {
                d.classList.toggle('tw-active', i === index);
            });
        }

        function goTo(index) {
            quoteEl.classList.add('tw-fade-out');
            authorEl.classList.add('tw-fade-out');

            setTimeout(function () {
                current = index;
                show(current);
                quoteEl.classList.remove('tw-fade-out');
                authorEl.classList.remove('tw-fade-out');
            }, 400);

            resetTimer();
        }

        function next() {
            if (paused) return;
            goTo((current + 1) % testimonials.length);
        }

        function resetTimer() {
            if (timer) clearInterval(timer);
            if (autoRotate) {
                timer = setInterval(next, interval);
            }
        }

        // Pause on hover
        card.addEventListener('mouseenter', function () { paused = true; });
        card.addEventListener('mouseleave', function () { paused = false; });

        // Start
        show(0);
        resetTimer();
    }

    return { init: init };
})();
