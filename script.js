let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const scoreDisplay = document.getElementById("scoreDisplay");

function loadQuestion() {
    const q = questions[current];
    questionEl.innerText = q.question;
    answersEl.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.innerText = answer;
        btn.onclick = () => checkAnswer(index);
        answersEl.appendChild(btn);
    });
}

function checkAnswer(index) {
    if (index === questions[current].correct) score++;
}

nextBtn.onclick = () => {
    current++;
    if (current < questions.length) {
        loadQuestion();
    } else {
        scoreDisplay.innerText = `Final Score: ${score}/${questions.length}`;
    }
};

loadQuestion();

/* ================= 3D TILT ================= */

const card = document.querySelector(".tilt-card");

card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 20;
    const rotateY = ((x / rect.width) - 0.5) * -20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
});

/* ================= PARTICLES ================= */

particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        size: { value: 3 },
        move: { speed: 2 },
        line_linked: { enable: true }
    }
});

/* ================= GSAP SCROLL ================= */

gsap.registerPlugin(ScrollTrigger);

gsap.from(".quiz-card", {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: ".quiz-card"
});

gsap.from(".about-card", {
    opacity: 0,
    y: 150,
    duration: 1,
    scrollTrigger: ".about-card"
});

/* ================= GITHUB REPO COUNTER ================= */

fetch("https://api.github.com/users/Pratyush736-hotdev")
    .then(res => res.json())
    .then(data => {
        document.getElementById("repoCount").innerText = data.public_repos;
    });
