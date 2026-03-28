(function () {
    "use strict";

    var THEME_KEY = "svh-theme";
    var RECIPIENT = "shravan.vinay.h@gmail.com";

    var navbar = document.getElementById("navbar");
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");
    var yearEl = document.getElementById("year");
    var themeToggle = document.getElementById("themeToggle");
    var themeLabel = document.getElementById("themeLabel");
    var contactForm = document.getElementById("contactForm");

    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    function applyTheme(theme) {
        var html = document.documentElement;
        if (theme === "light") {
            html.setAttribute("data-theme", "light");
            if (themeLabel) {
                themeLabel.textContent = "Light";
            }
        } else {
            html.setAttribute("data-theme", "dark");
            if (themeLabel) {
                themeLabel.textContent = "Dark";
            }
        }
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {}
    }

    function initTheme() {
        var stored = null;
        try {
            stored = localStorage.getItem(THEME_KEY);
        } catch (e) {}
        if (stored === "light" || stored === "dark") {
            applyTheme(stored);
        } else {
            applyTheme("dark");
        }
    }

    initTheme();

    var nav = document.getElementById("navbar");
    var hero = document.getElementById("home");
    var heroBg = document.getElementById("heroBg");

    if (hero && heroBg && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hero.addEventListener(
            "mousemove",
            function (e) {
                var r = hero.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5;
                var y = (e.clientY - r.top) / r.height - 0.5;
                heroBg.style.transform =
                    "scale(1.12) translate(" + x * 28 + "px, " + y * 22 + "px)";
            },
            { passive: true }
        );
        hero.addEventListener("mouseleave", function () {
            heroBg.style.transform = "scale(1.1)";
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            var html = document.documentElement;
            var next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
            applyTheme(next);
        });
    }

    if (navToggle && navbar && navLinks) {
        navToggle.addEventListener("click", function () {
            navbar.classList.toggle("open");
        });

        navLinks.querySelectorAll("a[href^='#']").forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("open");
            });
        });
    }

    var sections = document.querySelectorAll("section[id], footer[id]");
    var navAnchors = document.querySelectorAll(".nav-link[data-section]");

    function setActiveNav() {
        var scrollY = window.scrollY;
        if (nav) {
            nav.classList.toggle("nav-scrolled", scrollY > 56);
        }
        var vh = window.innerHeight;
        var doc = document.documentElement;
        var marker = scrollY + Math.min(160, vh * 0.22);
        var current = "";

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var bottom = top + section.offsetHeight;
            if (marker >= top && marker < bottom) {
                current = section.id;
            }
        });

        if (doc.scrollHeight > vh + 40 && scrollY + vh >= doc.scrollHeight - 8) {
            current = "contact";
        }

        if (scrollY < 72) {
            current = "home";
        }

        navAnchors.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("data-section") === current);
        });
    }

    window.addEventListener("scroll", setActiveNav, { passive: true });
    setActiveNav();

    var revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length && "IntersectionObserver" in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        );
        revealEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add("visible");
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var visitor = document.getElementById("visitorEmail");
            var label = document.getElementById("emailLabel");
            var message = document.getElementById("emailMessage");
            var from = visitor && visitor.value ? visitor.value.trim() : "";
            if (!from) {
                if (visitor) {
                    visitor.focus();
                }
                return;
            }
            var sub = label && label.value ? label.value.trim() : "Portfolio contact";
            var bodyLines = [];
            bodyLines.push("From: " + from);
            bodyLines.push("");
            if (message && message.value.trim()) {
                bodyLines.push(message.value.trim());
            } else {
                bodyLines.push("(No message body)");
            }
            var body = bodyLines.join("\n");
            var url =
                "mailto:" +
                encodeURIComponent(RECIPIENT) +
                "?subject=" +
                encodeURIComponent(sub) +
                "&body=" +
                encodeURIComponent(body);
            window.location.href = url;
        });
    }
})();
