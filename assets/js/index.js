function main() {
    const addAnimalButton = document.getElementById("add-animal-button");
    const dogsContainer = document.getElementById("dogs-container");
    
    
    const animalQuantityForm = document.getElementById("animal-quantity-form");
    const animalQuantityInput = document.getElementById("dogs-quantity-input");
    const maxDogsQuantity = 10;
    const minDogsQuantity = 1;

    addAnimalButton.addEventListener("click", () => addRandomDog(dogsContainer));
    
    
    animalQuantityForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const animalQuantity = animalQuantityInput.valueAsNumber;
        if (animalQuantity < minDogsQuantity || animalQuantity > maxDogsQuantity) {
            return alert(`Please enter a number between ${minDogsQuantity} and ${maxDogsQuantity}`);
        }
        await addDogsQuantity(animalQuantity, dogsContainer);
        // reset the form
        animalQuantityForm.reset();
    });
}

async function addRandomDog(dogsContainer) {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    const image = document.createElement("img");
    image.src = data.message;
    dogsContainer.appendChild(image);
}

async function addDogsQuantity(animalQuantity, dogsContainer) {
    for (let dogs = 0; dogs < animalQuantity; dogs += 1) {
        await addRandomDog(dogsContainer, dogs);
    }
}

main();