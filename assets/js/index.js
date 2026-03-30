function main() {

    const addAnimalButton = document.getElementById("add-animal-button");
    const animalContainer = document.getElementById("animal-container");

    addAnimalButton.addEventListener("click", () => addRandomDog(animalContainer));
}

async function addRandomDog(animalContainer) {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    const image = document.createElement("img");
    image.src = data.message;
    animalContainer.appendChild(image);
}

main();