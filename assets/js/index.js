function main() {
    const addAnimalButton = document.getElementById("add-animal-button");
    const animalContainer = document.getElementById("animal-container");
    
    
    const animalQuantityForm = document.getElementById("animal-quantity-form");
    const animalQuantityInput = document.getElementById("animal-quantity");

    addAnimalButton.addEventListener("click", () => addRandomDog(animalContainer));
    
    
    animalQuantityForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await addAnimals(animalQuantityInput.valueAsNumber, animalContainer);
        animalQuantityForm.reset();
    });
}

async function addRandomDog(animalContainer) {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    const image = document.createElement("img");
    image.src = data.message;
    animalContainer.appendChild(image);
}

async function addAnimals(animalQuantity, animalContainer) {
    for (let animal = 0; animal < animalQuantity; animal += 1) {
        await addRandomDog(animalContainer);
    }
}

main();