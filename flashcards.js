// flashcards.js

document.addEventListener("DOMContentLoaded", () => {
  const flashcardsContainer = document.getElementById("flashcards-container");
  const backToHomeBtn = document.getElementById("back-to-home-btn");

  function displayFlashcards() {
    const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
    flashcardsContainer.innerHTML = "";
    flashcards.forEach((card, index) => {
      const flashcardDiv = document.createElement("div");
      flashcardDiv.classList.add("flashcard");
      flashcardDiv.innerHTML = `
          <div class="flashcard-front">${card.front}</div>
          <div class="flashcard-back">${card.back}</div>
          <button class="remove-flashcard-btn" data-index="${index}">Remove</button>
        `;
      flashcardsContainer.appendChild(flashcardDiv);
    });

    // Add event listeners for remove buttons
    document.querySelectorAll(".remove-flashcard-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        removeFlashcard(index);
      });
    });
  }

  function removeFlashcard(index) {
    let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
    flashcards.splice(index, 1);
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    displayFlashcards();
  }

  backToHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html"; // Adjust the path if needed
  });

  // Load flashcards on page load
  displayFlashcards();
});
