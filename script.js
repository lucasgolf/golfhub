let doors = ["prêmio pequeno", "prêmio pequeno", "prêmio grande"];
let selectedDoor = null;
let revealedDoor = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function selectDoor(doorNumber) {
    if (selectedDoor !== null) return;
    selectedDoor = doorNumber;
    document.getElementById(`door${doorNumber}`).classList.add("selected");
}

function revealDoor() {
    if (selectedDoor === null) return;
    // Escolha uma porta que não seja a selecionada e que tenha um prêmio pequeno
    do {
        revealedDoor = Math.floor(Math.random() * 3) + 1;
    } while (revealedDoor === selectedDoor || doors[revealedDoor - 1] === "prêmio grande");

    document.getElementById(`door${revealedDoor}`).textContent = "prêmio pequeno";
}

function switchDoor() {
    if (selectedDoor === null || revealedDoor === null) return;
    // Mude para a outra porta que não foi revelada e não é a selecionada
    const remainingDoor = [1, 2, 3].find(
        (door) => door !== selectedDoor && door !== revealedDoor
    );

    selectedDoor = remainingDoor;
    document.querySelectorAll(".door").forEach((door) => door.classList.remove("selected"));
    document.getElementById(`door${remainingDoor}`).classList.add("selected");
    checkResult();
}

function checkResult() {
    const resultText =
        doors[selectedDoor - 1] === "prêmio grande"
            ? "Parabéns! Você ganhou o prêmio grande!"
            : "Você ganhou o prêmio pequeno. Tente novamente!";
    document.getElementById("result").textContent = resultText;
    document.getElementById(`door${selectedDoor}`).textContent = doors[selectedDoor - 1];
}

function resetGame() {
    doors = ["prêmio pequeno", "prêmio pequeno", "prêmio grande"];
    shuffle(doors);
    selectedDoor = null;
    revealedDoor = null;
    document.querySelectorAll(".door").forEach((door, index) => {
        door.textContent = `Porta ${index + 1}`;
        door.classList.remove("selected");
    });
    document.getElementById("result").textContent = "";
}

shuffle(doors);
