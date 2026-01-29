/* ----------------------------- */
/* DATA */
/* ----------------------------- */

const widgets = [
    { image: "./assets/widget1.jpg", name: "Velvet" },
    { image: "./assets/widget2.jpg", name: "Glass Relay" },
    { image: "./assets/widget3.jpg", name: "Noir-17" },
    { image: "./assets/widget4.jpg", name: "Driftline" },
    { image: "./assets/widget5.jpg", name: "Pulse 9" },
    { image: "./assets/widget6.jpg", name: "Cold Meridian" },
    { image: "./assets/widget7.jpg", name: "Astra" },
    { image: "./assets/widget8.jpg", name: "Mono Circuit" },
    { image: "./assets/widget9.jpg", name: "Lumen-04" },
    { image: "./assets/widget10.jpg", name: "Shadow Bloom" },
];

/* ----------------------------- */
/* HELPERS */
/* ----------------------------- */

const lerp = (a, b, t) => a + (b - a) * t;

const createSVG = (type, attrs = {}) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", type);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
};

/* ----------------------------- */
/* STATE */
/* ----------------------------- */

let svg, centerX, centerY, outerRadius;
let currentIndicatorRotation = 0;
let targetIndicatorRotation = 0;
let currentSpinnerRotation = 0;
let targetSpinnerRotation = 0;
let lastTime = performance.now();
let lastSegmentIndex = -1;

/* ----------------------------- */
/* CREATE SPINNER */
/* ----------------------------- */

const createWidgetSpinner = () => {
    const container = document.querySelector(".widgets");

    const viewport = Math.min(window.innerWidth, window.innerHeight);
    outerRadius = viewport * 0.4;
    const innerRadius = viewport * 0.25;

    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;

    svg = createSVG("svg", { id: "widget-svg" });
    const defs = createSVG("defs");
    svg.appendChild(defs);

    const anglePerSegment = (Math.PI * 2) / widgets.length;

    widgets.forEach((widget, i) => {
        const start = i * anglePerSegment - Math.PI / 2;
        const end = (i + 1) * anglePerSegment - Math.PI / 2;
        const mid = (start + end) / 2;

        const clip = createSVG("clipPath", { id: `clip-${i}` });
        const d = `
            M ${centerX + outerRadius * Math.cos(start)} ${centerY + outerRadius * Math.sin(start)}
            A ${outerRadius} ${outerRadius} 0 0 1 ${centerX + outerRadius * Math.cos(end)} ${centerY + outerRadius * Math.sin(end)}
            L ${centerX + innerRadius * Math.cos(end)} ${centerY + innerRadius * Math.sin(end)}
            A ${innerRadius} ${innerRadius} 0 0 0 ${centerX + innerRadius * Math.cos(start)} ${centerY + innerRadius * Math.sin(start)}
            Z
        `;
        clip.appendChild(createSVG("path", { d }));
        defs.appendChild(clip);

        const g = createSVG("g", {
            "clip-path": `url(#clip-${i})`,
            "data-segment": i,
        });

        const radius = (innerRadius + outerRadius) / 2;
        const x = centerX + Math.cos(mid) * radius;
        const y = centerY + Math.sin(mid) * radius;

        const arc = outerRadius * anglePerSegment;
        const w = arc * 1.25;
        const h = (outerRadius - innerRadius) * 1.25;
        const rotation = (mid * 180) / Math.PI + 90;

        const image = createSVG("image", {
            href: widget.image,
            width: w,
            height: h,
            x: x - w / 2,
            y: y - h / 2,
            preserveAspectRatio: "xMidYMid slice",
            transform: `rotate(${rotation} ${x} ${y})`,
        });

        g.appendChild(image);
        svg.appendChild(g);
    });

    container.appendChild(svg);

    /* INDICATOR */
    const indicatorInner = outerRadius * 0.625;
    const indicator = createSVG("line", {
        id: "widget-indicator",
        x1: centerX,
        y1: centerY - indicatorInner * 0.85,
        x2: centerX,
        y2: centerY - outerRadius * 1.05,
    });
    svg.appendChild(indicator);
};

/* ----------------------------- */
/* CONTENT UPDATE */
/* ----------------------------- */

const updateContent = () => {
    const relative =
        (((currentIndicatorRotation - currentSpinnerRotation) % 360) + 360) % 360;

    const segmentIndex =
        Math.floor(relative / (360 / widgets.length)) % widgets.length;

    if (segmentIndex !== lastSegmentIndex) {
        lastSegmentIndex = segmentIndex;

        document.querySelector(".widget-title").textContent =
            widgets[segmentIndex].name;

        const preview = document.querySelector(".widget-preview-img");
        const img = document.createElement("img");
        img.src = widgets[segmentIndex].image;
        img.alt = widgets[segmentIndex].name;

        gsap.set(img, { opacity: 0 });
        preview.appendChild(img);
        gsap.to(img, { opacity: 1, duration: 0.15, ease: "power2.out" });

        const imgs = preview.querySelectorAll("img");
        if (imgs.length > 3) {
            for (let i = 0; i < imgs.length - 3; i++) {
                imgs[i].remove();
            }
        }
    }
};

/* ----------------------------- */
/* ANIMATION LOOP */
/* ----------------------------- */

const animate = () => {
    const now = performance.now();
    let dt = (now - lastTime) / 1000;
    lastTime = now;
    dt = Math.min(dt, 0.1);

    targetIndicatorRotation += 18 * dt;
    targetSpinnerRotation -= 18 * 0.25 * dt;

    currentIndicatorRotation = lerp(
        currentIndicatorRotation,
        targetIndicatorRotation,
        0.1
    );
    currentSpinnerRotation = lerp(
        currentSpinnerRotation,
        targetSpinnerRotation,
        0.1
    );

    document
        .getElementById("widget-indicator")
        ?.setAttribute(
            "transform",
            `rotate(${currentIndicatorRotation % 360} ${centerX} ${centerY})`
        );

    svg
        .querySelectorAll("[data-segment]")
        .forEach((seg) =>
            seg.setAttribute(
                "transform",
                `rotate(${currentSpinnerRotation % 360} ${centerX} ${centerY})`
            )
        );

    updateContent();
    requestAnimationFrame(animate);
};

/* ----------------------------- */
/* EVENTS */
/* ----------------------------- */

window.addEventListener(
    "wheel",
    (e) => {
        e.preventDefault();
        const delta = e.deltaY * 0.05;
        targetIndicatorRotation += delta;
        targetSpinnerRotation -= delta;
    },
    { passive: false }
);

window.addEventListener("resize", () => {
    if (svg) svg.remove();
    createWidgetSpinner();
});

/* ----------------------------- */
/* INIT */
/* ----------------------------- */

createWidgetSpinner();
animate();
