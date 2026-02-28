let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const resultBox = document.getElementById("resultBox");
const scoreText = document.getElementById("scoreText");
const certificateBtn = document.getElementById("certificateBtn");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });

    updateProgress();
}

function selectAnswer(selectedIndex) {
    const buttons = answersContainer.querySelectorAll("button");
    const correctIndex = questions[currentQuestionIndex].correct;

    buttons.forEach((btn, index) => {
        if (index === correctIndex) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("wrong");
        }
        btn.disabled = true;
    });

    if (selectedIndex === correctIndex) score++;
}

function updateProgress() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    document.getElementById("question").classList.add("hidden");
    answersContainer.classList.add("hidden");
    nextBtn.classList.add("hidden");

    resultBox.classList.remove("hidden");
    scoreText.innerText = `Your Score: ${score} / ${questions.length}`;
    progressBar.style.width = "100%";
}

certificateBtn.addEventListener("click", () => {
    const name = prompt("Enter your name for certificate:");
    if (!name) return;

    const certificateWindow = window.open("", "_blank");
    certificateWindow.document.write(`
        <html>
        <head>
            <title>Certificate</title>
            <style>
                body {
                    text-align:center;
                    font-family:sans-serif;
                    padding:50px;
                }
                .cert {
                    border:10px solid #00f7ff;
                    padding:50px;
                }
            </style>
        </head>
        <body>
            <div class="cert">
                <h1>Certificate of Completion</h1>
                <h2>CODTECH Internship</h2>
                <p>This certifies that</p>
                <h2>${name}</h2>
                <p>has successfully completed the Interactive Quiz</p>
                <p>Score: ${score}/${questions.length}</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
            </div>
        </body>
        </html>
    `);
});
