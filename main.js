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
    var typingEl = document.getElementById("typingText");
    var TYPING_TEXT = "Backend & AI automation engineer|";

    function initTyping() {
        if (!typingEl) {
            return;
        }
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            typingEl.textContent = TYPING_TEXT.replace("|", "");
            return;
        }
        var index = 0;
        var forward = true;
        var pause = false;

        function tick() {
            if (pause) {
                setTimeout(function () {
                    pause = false;
                    forward = false;
                    tick();
                }, 900);
                return;
            }

            var display = TYPING_TEXT.slice(0, index);
            typingEl.textContent = display;

            if (forward) {
                if (index < TYPING_TEXT.length) {
                    index += 1;
                    setTimeout(tick, 55);
                } else {
                    pause = true;
                    setTimeout(tick, 400);
                }
            } else {
                if (index > 0) {
                    index -= 1;
                    setTimeout(tick, 28);
                } else {
                    forward = true;
                    setTimeout(tick, 200);
                }
            }
        }

        tick();
    }

    initTyping();
    initPrism();
    initCertMarquee();
    initSkillTilt();

    function initPrism() {
        var scene = document.getElementById("prismScene");
        var prism = document.getElementById("interactivePrism");
        if (!scene || !prism) {
            return;
        }

        var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        var tiltX = 18;
        var tiltY = 0;
        var targetX = 18;
        var targetY = 0;

        if (!reduceMotion) {
            document.addEventListener(
                "mousemove",
                function (e) {
                    var nx = e.clientX / window.innerWidth - 0.5;
                    var ny = e.clientY / window.innerHeight - 0.5;
                    targetX = 18 - ny * 22;
                    targetY = nx * 32;
                    scene.style.transform =
                        "translate(" + nx * 18 + "px, " + ny * 14 + "px)";
                },
                { passive: true }
            );

            (function tick() {
                tiltX += (targetX - tiltX) * 0.07;
                tiltY += (targetY - tiltY) * 0.07;
                prism.style.transform =
                    "rotateX(" + tiltX + "deg) rotateY(" + tiltY + "deg)";
                requestAnimationFrame(tick);
            })();
        }

        prism.addEventListener("click", function () {
            prism.classList.add("prism-pulse");
            window.setTimeout(function () {
                prism.classList.remove("prism-pulse");
            }, 550);
        });
    }

    function initCertMarquee() {
        var track = document.getElementById("certMarqueeTrack");
        if (!track || track.dataset.marqueeReady === "true") {
            return;
        }
        var cards = Array.prototype.slice.call(track.children);
        cards.forEach(function (card) {
            var clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            var link = clone.querySelector(".cert-link");
            if (link) {
                link.setAttribute("tabindex", "-1");
            }
            track.appendChild(clone);
        });
        track.dataset.marqueeReady = "true";
    }

    function initSkillTilt() {
        var tiles = document.querySelectorAll(".skill-tile[data-tilt]");
        if (!tiles.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        tiles.forEach(function (tile) {
            tile.addEventListener("mousemove", function (e) {
                var rect = tile.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width - 0.5;
                var y = (e.clientY - rect.top) / rect.height - 0.5;
                tile.style.transform =
                    "translateY(-8px) scale(1.03) rotateX(" +
                    -y * 8 +
                    "deg) rotateY(" +
                    x * 8 +
                    "deg)";
            });
            tile.addEventListener("mouseleave", function () {
                tile.style.transform = "";
            });
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
