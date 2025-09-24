

        const questions = [
            {
                image: 'https://prestinetravels.com/wp-content/uploads/2022/06/Hanna-Lake-1024x744.jpg',
                question: "Hint: Hanna Lake. Which location is this?",
                options: ["India", "Balochistan", "Russia", "Egypt"],
                answer: "Balochistan" // Corrected Balochistan
            },
            {
                image: 'https://acko-cms.ackoassets.com/Places_To_Visit_In_London_05784dc2a4.png',
                question: "Hint: GB. Which location is this?",
                options: ["London", "Moscow", "New York", "Beijing"],
                answer: "London"
            },
            {
                image: 'https://res.cloudinary.com/dyiffrkzh/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_400,q_auto,w_700/v1704278682/banbanjara/y14vhginaofpzbus67hr.webp',
                question: "Hint: USSR. Which location is this?",
                options: ["Italy", "Russia", "China", "Japan"],
                answer: "Russia"
            },
            {
                image: 'https://media.istockphoto.com/id/155439297/photo/the-forbidden-city-in-beijing-china.jpg?s=170667a&w=0&k=20&c=djeLeuk2InzkMkM7n34ohUbJhwz6d8K5z-g7sCGqmCM=',
                question: "Hint: Beijing. Which location is this?",
                options: ["Vietnam", "Thailand", "China", "Korea"],
                answer: "China"
            },
            {
                image: 'https://img.atlasobscura.com/FcSH73NMzQiOJizc_AbcZSQHGNbe9b_1OTXDKbSyUgs/rs:fill:600:400:1/g:ce/c:600:400:nowe:106:159/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy9iNmNk/M2UwY2M2MGZhMjQ0/NWRf2YbYtdioX9in/2YTYtNmH2YrYr18w/Mi5qcGc.jpg',
                question: "Hint: Baghdad. Which location is this?",
                options: ["Egypt", "Syria", "Iraq", "Yemen"],
                answer: "Iraq" //Baghdad is in Iraq
            }
        ];

        let score = 0;
        let askedQuestions = [];
        let currentQuestion;
        let gameEnded = false;


        function setupGUI() {
            const imageLabel = document.getElementById('image-label');
            const questionLabel = document.getElementById('question-label');
            const optionsFrame = document.getElementById('options-frame');
            const nextButton = document.getElementById('next-button');
            const tryAgainButton = document.getElementById('try-again-button');


            nextButton.addEventListener('click', loadQuestion);
            tryAgainButton.addEventListener('click', resetGame);
            nextButton.style.display = 'none'; // Hide until an answer is selected
            tryAgainButton.style.display = 'none';
        }


        function loadQuestion() {
            if (askedQuestions.length === questions.length) {
                endGame();
                return;
            }

            const availableQuestions = questions.filter(q => !askedQuestions.includes(q));
            currentQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
            askedQuestions.push(currentQuestion);

            const imageLabel = document.getElementById('image-label');
            const questionLabel = document.getElementById('question-label');
            const optionsFrame = document.getElementById('options-frame');
            optionsFrame.innerHTML = ''; // Clear previous options

            const img = document.createElement('img');
            img.src = currentQuestion.image;
            img.alt = "Quiz Image";
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            imageLabel.innerHTML = ''; // Clear previous image
            imageLabel.appendChild(img);

            questionLabel.textContent = currentQuestion.question;

            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option;
                button.addEventListener('click', () => checkAnswer(index));
                optionsFrame.appendChild(button);
            });

            const nextButton = document.getElementById('next-button');
            nextButton.style.display = 'none';

            updateProgress();
        }

        function checkAnswer(selectedOptionIndex) {
            if (gameEnded) return;
            const selectedOption = currentQuestion.options[selectedOptionIndex];
            const feedbackDiv = document.getElementById('feedback');
            const nextButton = document.getElementById('next-button');

            if (selectedOption === currentQuestion.answer) {
                score++;
                feedbackDiv.textContent = 'Correct!';
                feedbackDiv.style.color = 'green';
            } else {
                feedbackDiv.textContent = 'Wrong answer, try again.';
                feedbackDiv.style.color = 'red';
            }

            // Disable options after an answer
            const optionButtons = document.querySelectorAll('.option-button');
            optionButtons.forEach(button => {
                button.disabled = true;
            });
            nextButton.style.display = 'inline-block';
        }

        function endGame() {
            gameEnded = true;
            const container = document.querySelector('.container');
            const tryAgainButton = document.getElementById('try-again-button');
            container.innerHTML = `
                <div class="alert alert-success" role="alert">
                    <h2 class="alert-heading">Game Over!</h2>
                    <p>Your final score is ${score} out of ${questions.length}.</p>
                    <hr>
                    <p class="mb-0">Thanks for playing!</p>
                    <button id="try-again-button" class="btn btn-primary">Try Again</button>
                </div>
            `;
            //const footer = document.querySelector('.footer');
            //footer.style.position = 'static';  // Removed this line, not needed and can cause layout issues.
            tryAgainButton.style.display = 'inline-block'; // Ensure button is visible
        }

        function updateProgress() {
            const progressDiv = document.getElementById('progress');
            progressDiv.textContent = `Question ${askedQuestions.length} of ${questions.length}`;
        }

        function resetGame() {
            score = 0;
            askedQuestions = [];
            currentQuestion = null;
            gameEnded = false;

            const container = document.querySelector('.container');
            container.innerHTML = `
                <div id="image-label"></div>
                <div class="question-label" id="question-label"></div>
                <div class="options-frame" id="options-frame"></div>
                <button class="next-button" id="next-button">Next Question</button>
                <div id="feedback"></div>
                <div id="progress"></div>
                <button id="try-again-button">Try Again</button>
            `;

            setupGUI();
            loadQuestion();
        }


        setupGUI();
        loadQuestion(); // Start the game by loading the first question
