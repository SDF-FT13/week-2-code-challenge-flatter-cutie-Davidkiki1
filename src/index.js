document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");
  const detailedInfo = document.getElementById("detailed-info");
  const characterName = document.getElementById("name");
  const characterImage = document.getElementById("image");
  const voteCount = document.getElementById("vote-count");
  const votesForm = document.getElementById("votes-form");
  const votesInput = document.getElementById("votes");
  const resetButton = document.getElementById("reset-votes");

  let currentCharacter = null; // Store currently selected character

  // Fetch characters and display names in character bar
  fetch("http://localhost:3000/characters")
      .then(response => response.json())
      .then(characters => {
          characters.forEach(character => {
              const span = document.createElement("span");
              span.textContent = character.name;
              span.classList.add("character-name");
              span.addEventListener("click", () => displayCharacter(character));
              characterBar.appendChild(span);
          });
      });

  // Display character details
  function displayCharacter(character) {
      currentCharacter = character;
      characterName.textContent = character.name;
      characterImage.src = character.image;
      voteCount.textContent = character.votes;
  }

  // Handle votes form submission
  votesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const votesToAdd = parseInt(votesInput.value);
      if (!isNaN(votesToAdd) && currentCharacter) {
          currentCharacter.votes += votesToAdd;
          voteCount.textContent = currentCharacter.votes;
          votesInput.value = "";
      }
  });

  // Reset votes
  resetButton.addEventListener("click", () => {
      if (currentCharacter) {
          currentCharacter.votes = 0;
          voteCount.textContent = "0";
      }
  });
});