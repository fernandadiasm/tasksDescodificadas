const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
const maxTentativas = 10;
let tentativasFeitas = 0;

function checkGuess() {
    const palpiteElement = document.getElementById("guess");
    const hintElement = document.getElementById("hint");
    const attemptsElement = document.getElementById("attempts");
    const palpite = parseInt(palpiteElement.value);

    if (palpite < numeroAleatorio) {
        hintElement.textContent = "Seu palpite é menor que o número secreto.";
    } else if (palpite > numeroAleatorio) {
        hintElement.textContent = "Seu palpite é maior que o número secreto.";
    } else {
        hintElement.textContent = `Parabéns! Você acertou o número secreto em ${tentativasFeitas + 1} tentativa(s)! O número era ${numeroAleatorio}.`;
        palpiteElement.disabled = true;
    }

    tentativasFeitas++;
    attemptsElement.textContent = `Tentativas feitas: ${tentativasFeitas}`;

    if (tentativasFeitas >= maxTentativas) {
        hintElement.textContent = `Suas ${maxTentativas} tentativas acabaram! O número secreto era ${numeroAleatorio}.`;
        palpiteElement.disabled = true;
    }
}
