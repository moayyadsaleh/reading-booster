document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const domains = data;

      const domainList = document.getElementById("domain-list");
      const subdomainSection = document.getElementById("subdomain-section");
      const subdomainList = document.getElementById("subdomain-list");
      const lessonSection = document.getElementById("lesson-section");
      const nextLessonBtn = document.getElementById("next-lesson-btn");
      const hoverSound = document.getElementById("hover-sound");
      const clickSound = document.getElementById("click-sound");
      const instructionsSection = document.getElementById("instructions"); // Add this line
      let currentDomain = "";
      let currentSubdomainIndex = 0;

      document
        .getElementById("show-script-btn")
        .addEventListener("click", function () {
          document.getElementById("script").classList.toggle("hidden");
          document.getElementById("vocabulary").classList.toggle("hidden");
          document.getElementById("questions").classList.toggle("hidden");
          playClickSound();
        });

      document
        .getElementById("submit-quiz-btn")
        .addEventListener("click", function () {
          const answers = document.querySelectorAll(
            'input[type="radio"]:checked'
          );
          if (answers.length === 0) {
            alert("Please select an answer for each question.");
            return;
          }
          let score = 0;
          // Add logic to calculate the score based on selected answers
          alert("Your score: " + score);
          nextLessonBtn.classList.remove("hidden");
          playClickSound();
        });

      nextLessonBtn.addEventListener("click", function () {
        currentSubdomainIndex++;
        if (
          currentSubdomainIndex < Object.keys(domains[currentDomain]).length
        ) {
          showLesson(
            domains[currentDomain][
              Object.keys(domains[currentDomain])[currentSubdomainIndex]
            ]
          );
          scrollToInstructions();
        } else {
          alert("You have completed all the lessons in this domain.");
          lessonSection.classList.add("hidden");
          subdomainSection.classList.remove("hidden");
          scrollToSubdomain();
        }
        nextLessonBtn.classList.add("hidden");
        playClickSound();
      });

      function showSubdomains(domain) {
        currentDomain = domain;
        currentSubdomainIndex = 0;
        subdomainList.innerHTML = "";
        Object.keys(domains[domain]).forEach((subdomain, index) => {
          const li = document.createElement("li");
          li.textContent = subdomain;
          li.addEventListener("click", () => {
            currentSubdomainIndex = index;
            showLesson(domains[domain][subdomain]);
            scrollToInstructions(); // Scroll to instructions when clicking subdomain
            playClickSound();
          });
          li.addEventListener("mouseover", playHoverSound);
          subdomainList.appendChild(li);
        });
        subdomainSection.classList.remove("hidden");

        // Scroll to the subdomain section
        subdomainSection.scrollIntoView({ behavior: "smooth" });
      }

      function showLesson(subdomainData) {
        document.getElementById("lesson-text").textContent = subdomainData.text;
        document.getElementById(
          "script"
        ).innerHTML = `<p>${subdomainData.script}</p>`;
        const vocabTable = document.querySelector("#vocabulary table");
        vocabTable.innerHTML = "<tr><th>Arabic</th><th>English</th></tr>";
        subdomainData.vocabulary.forEach((word) => {
          vocabTable.innerHTML += `<tr><td>${word.arabic}</td><td>${word.english}</td></tr>`;
        });
        const quizForm = document.getElementById("quiz-form");
        quizForm.innerHTML = "";
        subdomainData.questions.forEach((q, index) => {
          let options = "";
          q.options.forEach((option, i) => {
            options += `<label><input type="radio" name="q${index}" value="${String.fromCharCode(
              97 + i
            )}" /> ${option}</label><br />`;
          });
          quizForm.innerHTML += `<div class="question"><p>${index + 1}. ${
            q.question
          }</p>${options}</div>`;
        });
        subdomainSection.classList.add("hidden");
        lessonSection.classList.remove("hidden");
      }

      function scrollToInstructions() {
        instructionsSection.scrollIntoView({ behavior: "smooth" });
      }

      function scrollToSubdomain() {
        subdomainSection.scrollIntoView({ behavior: "smooth" });
      }

      Object.keys(domains).forEach((domain) => {
        const li = document.createElement("li");
        li.textContent = domain;
        li.addEventListener("click", () => {
          showSubdomains(domain);
          playClickSound();
        });
        li.addEventListener("mouseover", playHoverSound);
        domainList.appendChild(li);
      });

      document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("mouseover", playHoverSound);
        button.addEventListener("click", playClickSound);
      });

      function playHoverSound() {
        hoverSound.currentTime = 0;
        hoverSound.play();
      }

      function playClickSound() {
        clickSound.currentTime = 0;
        clickSound.play();
      }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const flashcardBtn = document.getElementById("flashcard-btn");
  const flashcardCreatePage = document.getElementById("flashcard-create-page");
  const flashcardForm = document.getElementById("flashcard-form");
  const saveFlashcardBtn = document.getElementById("save-flashcard-btn");

  flashcardBtn.addEventListener("click", () => {
    flashcardCreatePage.classList.toggle("hidden");
  });

  saveFlashcardBtn.addEventListener("click", () => {
    const front = document.getElementById("flashcard-front").value;
    const back = document.getElementById("flashcard-back").value;

    if (front && back) {
      const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
      flashcards.push({ front, back });
      localStorage.setItem("flashcards", JSON.stringify(flashcards));
      flashcardForm.reset();
      window.location.href = "flashcards.html"; // Redirect to flashcards page
    }
  });
});
