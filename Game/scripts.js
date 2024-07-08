const Questions = [
    { questionText: "Fact: A group of flamingos is called a flamboyance", correctAnswer: "True" },
    { questionText: "Fact: Dolphins sleep with both eyes closed.", correctAnswer: "False" },
    { questionText: "Fact: A cat's purr can have healing properties.", correctAnswer: "True" },
    { questionText: "Fact: Bats are blind.", correctAnswer: "False" },
    { questionText: "Fact: A snail can sleep for three years.", correctAnswer: "True" },
    { questionText: "Fact: Cows have four stomachs.", correctAnswer: "True" },
    { questionText: "Fact: Ostriches can run faster than horses.", correctAnswer: "True" },
    { questionText: "Fact: Elephants are the only animals that cannot jump", correctAnswer: "True" },
    { questionText: "Fact: A blue whale's heart is the size of a small car", correctAnswer: "True" },
    { questionText: "Fact: Alligators can live up to 100 years.", correctAnswer: "False" },
    { questionText: "Fact: Penguins can fly.", correctAnswer: "False" },
    { questionText: "Fact: The fingerprints of a koala are so indistinguishable from humans that they have been confused at crime scenes", correctAnswer: "True" },
    { questionText: "Fact: Frogs drink water through their skin.", correctAnswer: "True" },
    { questionText: "Fact: Sharks are immune to all known diseases.", correctAnswer: "False" },
    { questionText: "Fact: Some turtles can breathe through their butts.", correctAnswer: "True" },
    { questionText: "Fact: A tiger's roar can be heard up to 2 miles away.", correctAnswer: "True" },
    { questionText: "Fact: Goldfish have a memory span of three seconds.", correctAnswer: "False" },
    { questionText: "Fact: A shrimp's heart is in its head.", correctAnswer: "True" },
    { questionText: "Fact: Slugs have four noses.", correctAnswer: "True" },
    { questionText: "Fact: An octopus has three hearts.", correctAnswer: "True" },
    { questionText: "Fact: A cow gives nearly 200,000 glasses of milk in a lifetime.", correctAnswer: "True" },
    { questionText: "Fact: It takes a sloth two weeks to digest its food.", correctAnswer: "True" },
    { questionText: "Fact: Nearly three percent of the ice in Antarctic glaciers is penguin urine.", correctAnswer: "True" },
    { questionText: "Fact: A blue whale can eat half a million calories in one mouthful.", correctAnswer: "True" },
    { questionText: "Fact: The longest recorded flight of a chicken is 13 seconds.", correctAnswer: "True" },
    { questionText: "Fact: A rhinoceros's horn is made of hair.", correctAnswer: "True" },
    { questionText: "Fact: A crocodile cannot stick its tongue out.", correctAnswer: "True" },
    { questionText: "Fact: It is possible to hypnotize a frog by placing it on its back and gently stroking its stomach.", correctAnswer: "True" },
    { questionText: "Fact: It takes a butterfly one month to transition from a caterpillar.", correctAnswer: "False" },
    { questionText: "Fact: A jellyfish is 95% water.", correctAnswer: "True" },
];

const numPlayers = 20;
let players = Array.from({ length: numPlayers }, (_, i) => ({ id: i + 1, score: 50, eliminated: false }));
let currentQuestionIndex = 0;

function displayQuestions() {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "";
    const question = Questions[currentQuestionIndex];
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `
        <h4>${currentQuestionIndex + 1}. ${question.questionText}</h4>
        <div class="player-grid">
            ${players.map(player => {
                if (!player.eliminated) {
                    return `
                    <div class="player-card">
                        <p>Player ${player.id}</p>
                        <label>
                            <input type="radio" name="question${player.id}" value="True"> True
                        </label>
                        <label>
                            <input type="radio" name="question${player.id}" value="False"> False
                        </label>
                    </div>
                    `;
                } else {
                    return `<p class="eliminated">Player ${player.id} (Eliminated)</p>`;
                }
            }).join('')}
        </div>
    `;
    quizDiv.appendChild(questionDiv);
}

function submitAnswers() {
    const question = Questions[currentQuestionIndex];
    players.forEach(player => {
        if (!player.eliminated) {
            const selectedAnswer = document.querySelector(`input[name="question${player.id}"]:checked`);
            if (selectedAnswer) {
                if (selectedAnswer.value === question.correctAnswer) {
                    player.score += 10;
                } else {
                    player.score -= 10;
                }
            } else {
                alert(`Player ${player.id} did not select an answer!`);
                return;
            }
            if (player.score <= 0) {
                player.eliminated = true;
                alert(`Player ${player.id} is eliminated!`);
            }
        }
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < Questions.length) {
        displayQuestions();
    } else {
        alert("All questions have been answered!");
    }

    updateStatus();
    updateEliminatedPlayers();
}

function updateStatus() {
    const statusDiv = document.getElementById("status");
    statusDiv.innerHTML = `
        <p>Current Question: ${currentQuestionIndex + 1}</p>
        <p>Remaining Players: ${players.filter(player => !player.eliminated).length}</p>
    `;
    const scoreBoard = document.getElementById("scoreBoard");
    scoreBoard.innerHTML = `
        <h3>Score Board</h3>
        <ul>
            ${players.map(player => `<li>Player ${player.id}: ${player.score} points</li>`).join('')}
        </ul>
    `;
}

function updateEliminatedPlayers() {
    const eliminatedPlayers = players.filter(player => player.eliminated).map(player => player.id).join(", ");
    document.getElementById("eliminated").innerText = `Eliminated Players: ${eliminatedPlayers}`;
}

displayQuestions();
updateStatus();
