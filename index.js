(function (window, document) {
    // General Variables/Refrences
    const root = document.querySelector("html");
    const menuControl = document.querySelector("div [aria-controls]");
    const bar = document.querySelector("[aria-expanded]");
    const navBar = document.querySelector("nav ul");
    const pjCard = document.querySelectorAll(".demos__card");
    const pjWrapper = document.querySelector(".demos__wrapper");
    const tagLine = document.querySelector(".header-tagline-1 span");
    const media = document.querySelector(".typewriter__media");
    const mediaImage = document.querySelectorAll(".typewriter__media img");
    const scroll = document.querySelector(".scroll");
    const hero = document.querySelector(".title");
    const schemeSettings = document.querySelectorAll("[data-scheme]");
    const { top: OFFSETY } = hero.getBoundingClientRect();
    function getColorScheme(mode) {
        return getComputedStyle(document.documentElement).getPropertyValue(mode);
    }
    function setColorScheme(mode, hue) {
        root.style.setProperty(mode, hue);

    }

    schemeSettings.forEach((el, i) => el.addEventListener("click", (e) => {
        e.currentTarget.dataset.scheme = "false";
        schemeSettings[i == 0 ? 1 : 0].dataset.scheme = "true";
        colorScheme();
    }));

    function colorScheme() {
        let toggleMode = getComputedStyle(document.documentElement).getPropertyValue("--on");
        switch (toggleMode) {
            case "1":
                setColorScheme("--on", 0);
                setColorScheme("--dark-mode", "initial");
                break;
            default:
                setColorScheme("--on", 1);
                setColorScheme("--dark-mode", getColorScheme("--FOOTER-DARK"));
        }
    }


    function fixed(e) {

        if (window.scrollY >= Math.round(OFFSETY)) {
            hero.style.setProperty("--height", Math.round(OFFSETY - 50));
            scroll.dataset.fixed = "true";
        } else {
            delete scroll.dataset.fixed;
            hero.style.setProperty("--height", 0);
        }
    }

    document.addEventListener("scroll", fixed, { capture: true });


    let tracker = index = 0;
    tagLineText = "";

    const taglines = ["Elevate online businesses",
        "Enhance web experiences",
        "Brings ideas to live", "on all media technology"]
    let temp = taglines[index];
    let isDeleting = false;
    let period = 200;
    ;



    function typeWriter() {
        if (!isDeleting && tagLineText == temp) {
            if (index == 3) {
                media.classList.toggle("media-show");
                mediaImage.forEach((el) => el.classList.toggle("media__img"));

            }
            isDeleting = true;
            period /= 3;
        } else if (isDeleting && tagLineText == "") {
            if (tracker == 3) {
                media.classList.toggle("media-show");
                mediaImage.forEach((el) => el.classList.toggle("media__img"));
                tracker = index = 0;

            } else {
                tracker = ++index;
            }
            isDeleting = false;
            temp = taglines[index];
            period = 200;

        }


        if (!isDeleting) tagLine.textContent = tagLineText = temp.substring(0, tagLineText.length + 1);
        if (isDeleting) tagLine.textContent = tagLineText = temp.substring(0, tagLineText.length - 1);

    }



    function delayTypeWriter() {
        tagLine.dataset.state = "ready";
        setInterval(typeWriter, period)
    };
    setTimeout(delayTypeWriter, 4000);

    // Accordion Control
    function openAccordion(target, ctl) {

        return () => {
            target.classList.remove("hide");
            ctl.classList.toggle("hide");
        }
    }

    // Navigation Control
    function toggleNav(e) {
        let barState = e.currentTarget.firstElementChild.getAttribute("aria-expanded") == "true" || false;
        bar.setAttribute("aria-expanded", !barState);
        navBar.classList.toggle("show");

    }

    menuControl.addEventListener("click", toggleNav);
    pjCard.forEach((el) => {
        let accordion = el.querySelector(".accordion-outer");
        let accordionClose = accordion.querySelector("svg");
        let accordionCta = el.querySelector(".demos__cta svg");
        let accordionCtaWrapper = el.querySelector(".accordion-cta-open");

        accordionCta.addEventListener("click", openAccordion(accordion, accordionCtaWrapper));
        accordionClose.addEventListener("click", () => {
            accordion.classList.add("hide");
            accordionCtaWrapper.classList.toggle("hide");
        })
    });


    const WIDTH = pjWrapper.getBoundingClientRect().width;//window.innerWidth;
    const { width: PJCARDWIDTH } = pjCard[0].getBoundingClientRect();
    let minCard = sliceIndex = Math.ceil(WIDTH / PJCARDWIDTH);
    pjWrapper.style.setProperty("--card-width", minCard);
    pjList = Array.from(pjCard);
    console.log(minCard, PJCARDWIDTH);

    function next() {
        if (pjList.length >= sliceIndex) {
            pjList.slice(sliceIndex - minCard, sliceIndex).forEach((el) => {
                el.style.display = "none";
            });
            let showNext = pjList.slice(sliceIndex - 1, sliceIndex + (minCard - 1));
            sliceIndex += minCard - 1;
            showNext.forEach(el => el.removeAttribute("style"));
        }

    }
    function previous() {
        if (sliceIndex > minCard) {
            pjList.slice(sliceIndex - minCard, sliceIndex).forEach((el) => {
                el.style.display = "none";
            })
            let showPrevious = pjList.slice(sliceIndex - (minCard * 2 - 1), sliceIndex - (minCard - 1));
            sliceIndex -= minCard - 1;
            showPrevious.forEach(el => el.removeAttribute("style"));
        }
    }
    function makeCarouse() {
        const carouselCtl = document.querySelectorAll(".demos__wrapper button");
        pjList.slice(minCard).forEach(el => el.style.display = "none");
        pjWrapper.addEventListener("mouseenter", () => {
            carouselCtl.forEach(el => el.style.opacity = "1");

        });
        pjWrapper.addEventListener("mouseleave", () => {
            carouselCtl.forEach(el => el.removeAttribute("style"));
        })

        const before = pjWrapper.querySelector(".demos__wrapper__left");
        const after = pjWrapper.querySelector(".demos__wrapper__right");

        after.addEventListener("click", next);
        before.addEventListener("click", previous);

    }
    makeCarouse();
})(window, document)
