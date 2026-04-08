let dogAddSequence = 0;

function main() {
    const addAnimalButton = document.getElementById("add-animal-button");
    const dogsContainer = document.getElementById("dogs-container");
    const sortSelect = document.getElementById("sort-select");
    const actionClear = document.getElementById("action-clear");
    const actionScrollTop = document.getElementById("action-scroll-top");

    const animalQuantityForm = document.getElementById("animal-quantity-form");
    const animalQuantityInput = document.getElementById("dogs-quantity-input");
    const maxDogsQuantity = 20;
    const minDogsQuantity = 1;

    addAnimalButton.addEventListener("click", async () => {
        await addRandomDog(dogsContainer);
        if (sortSelect.value !== "random") {
            sortDogs(dogsContainer, sortSelect.value);
        }
    });

    sortSelect.addEventListener("change", () => {
        sortDogs(dogsContainer, sortSelect.value);
    });

    actionClear.addEventListener("click", () => {
        dogsContainer.replaceChildren();
        dogAddSequence = 0;
    });

    actionScrollTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    animalQuantityForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const animalQuantity = animalQuantityInput.valueAsNumber;
        if (animalQuantity < minDogsQuantity || animalQuantity > maxDogsQuantity) {
            return alert(`Please enter a number between ${minDogsQuantity} and ${maxDogsQuantity}`);
        }
        await addDogsQuantity(animalQuantity, dogsContainer);
        if (sortSelect.value !== "random") {
            sortDogs(dogsContainer, sortSelect.value);
        }
        animalQuantityForm.reset();
    });
}

function breedFromDogCeoUrl(url) {
    try {
        const path = new URL(url).pathname;
        const match = path.match(/\/breeds\/([^/]+)\//);
        return match ? match[1].toLowerCase() : url;
    } catch {
        return url;
    }
}

function sortDogs(dogsContainer, mode) {
    const images = [...dogsContainer.querySelectorAll("img")];
    if (images.length === 0) {
        return;
    }

    if (mode === "random") {
        for (let i = images.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }
    } else if (mode === "newest") {
        images.sort((a, b) => Number(b.dataset.added) - Number(a.dataset.added));
    } else if (mode === "oldest") {
        images.sort((a, b) => Number(a.dataset.added) - Number(b.dataset.added));
    } else if (mode === "breed") {
        images.sort((a, b) =>
            breedFromDogCeoUrl(a.src).localeCompare(breedFromDogCeoUrl(b.src))
        );
    }

    for (const img of images) {
        dogsContainer.appendChild(img);
    }
}

async function addRandomDog(dogsContainer) {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    const image = document.createElement("img");
    image.src = data.message;
    dogAddSequence += 1;
    image.dataset.added = String(dogAddSequence);
    image.alt = "Dog";
    dogsContainer.appendChild(image);
}

async function addDogsQuantity(animalQuantity, dogsContainer) {
    for (let dogs = 0; dogs < animalQuantity; dogs += 1) {
        await addRandomDog(dogsContainer);
    }
}

main();