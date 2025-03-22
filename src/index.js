// Your code here
fetch("http://localhost:3000/characters")
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
