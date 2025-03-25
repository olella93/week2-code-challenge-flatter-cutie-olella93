document.addEventListener("DOMContentLoaded", () => {
    let currentCharacterId = null;
    
    // fetch characters from server
    fetch("https://flatter-cuties-db.vercel.app/characters")
    .then(response => response.json())
    .then(characters => {
        characters.forEach(character => createCharacterSpan(character));
    });
    
    // create span for each character
    function createCharacterSpan(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.style.cursor = "pointer";
        span.addEventListener("click", () => displayCharacter(character));
        document.getElementById("character-bar").appendChild(span);
    }

    //display character details
    function displayCharacter(character) {
        currentCharacterId = character.id;
        document.getElementById("name").textContent = character.name;
        document.getElementById("image").src = character.image;
        document.getElementById("image").alt = character.name;
        document.getElementById("vote-count").textContent = character.votes;
    }

    // handle vote form submission
    document.getElementById("votes-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const voteInput = document.getElementById("votes");
        const votesToAdd = parseInt(document.getElementById("votes").value, 10);
        if (!isNaN(votesToAdd)) {
            let voteCountElement = document.getElementById("vote-count");
            let newVotes = parseInt(voteCountElement.textContent) + votesToAdd;
            voteCountElement.textContent = newVotes;

            updateCharacterVotes(currentCharacterId, newVotes);
        }
        document.getElementById("votes").value = "";
    });

    // Updating Votes on Server
    function updateCharacterVotes(characterId, newVotes) {
        fetch(`https://flatter-cuties-db.vercel.app/characters/${characterId}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({votes:newVotes})
        })
        .then(response=>{
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(updatedCharacter=>{
            console.log("Character updated:", updatedCharacter);
        })
        .catch(error=>{
            console.error("There was a problem updating the votes:", error);
        });
    }

    //reset votes
    const resetButton = document.getElementById("reset-btn");
    resetButton.addEventListener("click", () => {
        const voteCount = document.getElementById("vote-count");
        voteCount.textContent = "0";

        //clear input field
        const voteInput = document.getElementById("votes");
        voteInput.value = "";

        alert("Votes have been reset!");
    })
});