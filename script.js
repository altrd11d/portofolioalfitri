/* ==========================================================
    Portfolio Website
    Author : Alfitri Deviani
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    pageLoader();
    mobileMenu();
    navbarEffect();
    smoothScroll();
    revealElement();
    activeMenu();
    heroParallax();
    backToTop();
    modalDismiss();
    modalSwipe();
    setFooterYear();

    loadCharacters();
    loadAssets();
    loadEnvironment();
    loadAnimation();

    // Keyboard support: Enter/Space opens a focused gallery card
    document.addEventListener("keydown", e => {

        if ((e.key === "Enter" || e.key === " ") &&
            e.target.classList.contains("gallery-card")) {

            e.preventDefault();
            e.target.click();

        }

    });

    const closeBtn = document.querySelector(".modal-close");

    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

});

/* ==========================================================
    Close Modal (shared)
========================================================== */

function closeModal() {

    const video = document.getElementById("modal-video");

    if (video) {

        video.pause();
        video.removeAttribute("src");
        video.load();

    }

    document.getElementById("portfolio-modal").style.display = "none";
    document.body.classList.remove("no-scroll");

}

function modalDismiss() {

    const modal = document.getElementById("portfolio-modal");

    if (!modal) return;

    // Close when clicking on the dark backdrop (outside modal-content)
    modal.addEventListener("click", e => {

        if (e.target === modal) {
            closeModal();
        }

    });

    // Close with the Escape key
    document.addEventListener("keydown", e => {

        if (e.key === "Escape" && modal.style.display === "flex") {
            closeModal();
        }

    });

}

/* ==========================================================
    Swipe Support for Modal (mobile)
========================================================== */

function modalSwipe() {

    const wrapper = document.querySelector(".image-wrapper");

    if (!wrapper) return;

    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    wrapper.addEventListener("touchend", e => {

        touchEndX = e.changedTouches[0].screenX;

        const delta = touchEndX - touchStartX;

        if (Math.abs(delta) < 40) return;

        if (delta < 0) {
            document.getElementById("next-image")?.click();
        } else {
            document.getElementById("prev-image")?.click();
        }

    }, { passive: true });

}

/* ==========================================================
    Page Loader
========================================================== */

function pageLoader() {

    const loader = document.getElementById("loader");
    const progressBar = document.getElementById("progress-bar");

    if (!loader) return;

    let progress = 0;

    const interval = setInterval(() => {

        progress += Math.random() * 18;

        if (progress > 90) progress = 90;

        if (progressBar) progressBar.style.width = progress + "%";

    }, 150);

    const finish = () => {

        clearInterval(interval);

        if (progressBar) progressBar.style.width = "100%";

        setTimeout(() => {

            loader.classList.add("loader-hidden");

            setTimeout(() => {
                if (progressBar) progressBar.style.width = "0";
            }, 500);

        }, 250);

    };

    if (document.readyState === "complete") {
        finish();
    } else {
        window.addEventListener("load", finish);
    }

}

/* ==========================================================
    Mobile Menu
========================================================== */

function mobileMenu() {

    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");
    const overlay = document.getElementById("nav-overlay");

    if (!toggle || !menu) return;

    const openMenu = () => {

        menu.classList.add("active");
        toggle.classList.add("active");
        overlay?.classList.add("active");
        toggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("no-scroll");

    };

    const closeMenu = () => {

        menu.classList.remove("active");
        toggle.classList.remove("active");
        overlay?.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");

    };

    toggle.addEventListener("click", () => {

        menu.classList.contains("active") ? closeMenu() : openMenu();

    });

    overlay?.addEventListener("click", closeMenu);

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) closeMenu();

    });

}

/* ==========================================================
    Back to Top
========================================================== */

function backToTop() {

    const btn = document.getElementById("back-to-top");

    if (!btn) return;

    window.addEventListener("scroll", () => {

        btn.classList.toggle("show", window.scrollY > 500);

    });

    btn.addEventListener("click", () => {

        window.scrollTo({ top: 0, behavior: "smooth" });

    });

}

/* ==========================================================
    Footer Year
========================================================== */

function setFooterYear() {

    const year = document.getElementById("year");

    if (year) year.textContent = new Date().getFullYear();

}

/* ==========================================================
    Navbar Effect
========================================================== */

function navbarEffect() {

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.style.background = "rgba(15,15,15,.90)";
            header.style.boxShadow = "0 8px 25px rgba(0,0,0,.35)";

        } else {

            header.style.background = "rgba(15,15,15,.55)";
            header.style.boxShadow = "none";

        }

    });

}

/* ==========================================================
    Smooth Scroll
========================================================== */

function smoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", e => {

            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });

}

/* ==========================================================
    Reveal Animation
========================================================== */

function revealElement() {

    const elements = document.querySelectorAll(
        ".section-heading, .featured-content, .gallery-grid"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: .2
    });

    elements.forEach(item => observer.observe(item));

}

/* ==========================================================
    Active Menu
========================================================== */

function activeMenu() {

    const sections = document.querySelectorAll("section");
    const menus = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 200;

            if (window.scrollY >= top) {
                current = section.id;
            }

        });

        menus.forEach(menu => {

            menu.classList.remove("active");

            if (menu.getAttribute("href") === "#" + current) {
                menu.classList.add("active");
            }

        });

    });

}

/* ==========================================================
    Hero Parallax
========================================================== */

function heroParallax() {

    const hero = document.querySelector(".hero-content");

    window.addEventListener("scroll", () => {

        hero.style.transform = `translateY(${window.scrollY * .35}px)`;
        hero.style.opacity = 1 - (window.scrollY / 500);

    });

}

/* ==========================================================
    Character Gallery
========================================================== */

async function loadCharacters() {

    const gallery = document.getElementById("character-gallery");

    try {

        const response = await fetch("data/characters.json");
        const characters = await response.json();

        characters.forEach((character, index) => {

            gallery.innerHTML += `
                <div class="gallery-card" data-id="${index}" tabindex="0" role="button" aria-label="Lihat ${character.title}">
                    <img src="${character.thumbnail}" alt="${character.title}" loading="lazy" decoding="async" onload="this.classList.add('loaded')">
                    <div class="gallery-info">
                        <h3>${character.title}</h3>
                        <p>${character.category}</p>
                    </div>
                </div>
            `;

        });

        document.querySelectorAll("#character-gallery .gallery-card")
            .forEach((card, index) => {

                card.addEventListener("click", () => {

                    openCharacter(characters[index]);

                });

            });

    } catch (error) {

        console.error("Character loading error:", error);

    }

}

/* ==========================================================
    Asset Gallery
========================================================== */

async function loadAssets() {

    const gallery = document.getElementById("asset-gallery");

    try {

        const response = await fetch("data/assets.json");
        const assets = await response.json();

        assets.forEach(asset => {

            gallery.innerHTML += `
                <div class="gallery-card" tabindex="0" role="button" aria-label="Lihat ${asset.title}">
                    <img src="${asset.thumbnail}" alt="${asset.title}" loading="lazy" decoding="async" onload="this.classList.add('loaded')">
                    <div class="gallery-info">
                        <h3>${asset.title}</h3>
                        <p>${asset.category}</p>
                    </div>
                </div>
            `;

        });

                document.querySelectorAll("#asset-gallery .gallery-card")
            .forEach((card, index) => {

                card.addEventListener("click", () => {

                    openAsset(assets[index]);

                });

            });

    } catch (error) {

        console.error(error);

    }

}


/* ==========================================================
    Environment Gallery
========================================================== */

async function loadEnvironment() {

    const gallery = document.getElementById("environment-gallery");

    try {

        const response = await fetch("data/environment.json");
        const environment = await response.json();

        environment.forEach(environment => {

            gallery.innerHTML += `
                <div class="gallery-card" tabindex="0" role="button" aria-label="Lihat ${environment.title}">
                    <img src="${environment.thumbnail}" alt="${environment.title}" loading="lazy" decoding="async" onload="this.classList.add('loaded')">
                    <div class="gallery-info">
                        <h3>${environment.title}</h3>
                        <p>${environment.category}</p>
                    </div>
                </div>
            `;

        });

                document.querySelectorAll("#environment-gallery .gallery-card")
            .forEach((card, index) => {

                card.addEventListener("click", () => {

                    openEnvironment(environment[index]);

                });

            });

    } catch (error) {

        console.error(error);

    }

}


/* ==========================================================
    Animation Gallery
========================================================== */

async function loadAnimation() {

    const gallery = document.getElementById("animation-gallery");

    try {

        const response = await fetch("data/animation.json");
        const animations = await response.json();

        animations.forEach(animation => {

            gallery.innerHTML += `
                <div class="gallery-card" tabindex="0" role="button" aria-label="Putar ${animation.title}">
                    <img src="${animation.thumbnail}" alt="${animation.title}" loading="lazy" decoding="async" onload="this.classList.add('loaded')">
                    <div class="gallery-info">
                        <h3>${animation.title}</h3>
                        <p>${animation.category}</p>
                    </div>
                </div>
            `;

        });

        document.querySelectorAll("#animation-gallery .gallery-card")
        .forEach((card, index) => {

            card.addEventListener("click", () => {
                openAnimation(animations[index]);
            });

        });

    } catch (error) {

        console.error(error);

    }

}

/* ==========================================================
    Modal Gallery
========================================================== */

let currentImages = [];
let currentIndex = 0;
let panzoom = null;

function openCharacter(character) {

    const modal = document.getElementById("portfolio-modal");

    const image = document.getElementById("modal-image");
    const video = document.getElementById("modal-video");

    video.pause();
    video.removeAttribute("src");
    video.load();

    video.style.display = "none";
    image.style.display = "block";

    currentImages = character.images;
    currentIndex = 0;

    showImage();

    document.getElementById("modal-title").innerHTML = character.title;
    document.getElementById("modal-description").innerHTML = character.description;
;

    modal.style.display = "flex";
    document.body.classList.add("no-scroll");

}

function openAsset(asset) {

    const modal = document.getElementById("portfolio-modal");

    const image = document.getElementById("modal-image");
    const video = document.getElementById("modal-video");

    video.pause();
    video.removeAttribute("src");
    video.load();

    video.style.display = "none";
    image.style.display = "block";

    currentImages = asset.images;
    currentIndex = 0;

    showImage();

    document.getElementById("modal-title").innerHTML = asset.title;
    document.getElementById("modal-description").innerHTML = asset.description;

    modal.style.display = "flex";
    document.body.classList.add("no-scroll");
}

function openEnvironment(environment) {

    const modal = document.getElementById("portfolio-modal");

    const image = document.getElementById("modal-image");
    const video = document.getElementById("modal-video");

    video.pause();
    video.removeAttribute("src");
    video.load();

    video.style.display = "none";
    image.style.display = "block";

    currentImages = environment.images;
    currentIndex = 0;

    showImage();

    document.getElementById("modal-title").innerHTML = environment.title;
    document.getElementById("modal-description").innerHTML = environment.description;
    document.getElementById("next-image").style.display = "block";
    document.getElementById("prev-image").style.display = "block";

    modal.style.display = "flex";
    document.body.classList.add("no-scroll");
}

function openAnimation(animation){

    const modal = document.getElementById("portfolio-modal");

    const image = document.getElementById("modal-image");
    const video = document.getElementById("modal-video");

    image.style.display = "none";

    video.style.display = "block";
    video.src = animation.video;
    video.load();

    document.getElementById("modal-title").innerHTML = animation.title;
    document.getElementById("modal-description").innerHTML = animation.description;
    document.getElementById("next-image").style.display = "none";
    document.getElementById("prev-image").style.display = "none";

    modal.style.display = "flex";
    document.body.classList.add("no-scroll");

}

function showImage() {

    const image = document.getElementById("modal-image");

    image.src = currentImages[currentIndex];

    console.log("Current Index :", currentIndex);
    console.log("Image :", currentImages[currentIndex]);

    image.onload = () => {

        if (panzoom) {
            panzoom.destroy();
        }

        panzoom = Panzoom(image, {
            maxScale: 6,
            minScale: 1,
            contain: "outside"
        });

        const wrapper = document.querySelector(".image-wrapper");
        wrapper.onwheel = panzoom.zoomWithWheel;

    };

    const video = document.getElementById("modal-video");

    video.pause();
    video.style.display = "none";

    image.style.display = "block";

}

document.getElementById("next-image").onclick = function () {

    currentIndex++;

    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    showImage();

};

document.getElementById("prev-image").onclick = function () {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }

    showImage();

};