document.addEventListener("DOMContentLoaded", () => {
    fetch("https://flatter-cuties-db.vercel.app/characters")
    .then(response => response.json())
    .then(characters => {
        characters.forEach(character => createCharacterSpan(character));
    });

    function createCharacterSpan(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.style.cursor = "pointer";
        span.addEventListener("click", () => displayCharacter(character));
        document.getElementById("character-bar").appendChild(span);
    }

    function displayCharacter(character) {
        document.getElementById("name").textContent = character.name;
        document.getElementById("image").src = character.image;
        document.getElementById("image").alt = character.name;
        document.getElementById("vote-count").textContent = character.votes;
    }

    document.getElementById("votes-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const votesToAdd = parseInt(document.getElementById("votes").value, 10);
        if (!isNaN(votesToAdd)) {
            let voteCountElement = document.getElementById("vote-count");
            let newVotes = parseInt(voteCountElement.textContent) + votesToAdd;
            voteCountElement.textContent = newVotes;
        }
        document.getElementById("votes").value = "";
    });
});