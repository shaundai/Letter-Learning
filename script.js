const inputWindow = document.querySelector("input");

const allCards = [
  { name: "A", example: "alligator", keycode: "65", src: "sounds/A.wav" },
  { name: "B", example: "bear", keycode: "66", src: "sounds/B.wav" },
  { name: "C", example: "cat", keycode: "67", src: "sounds/C.wav" },
  { name: "D", example: "dog", keycode: "68", src: "sounds/D.wav" },
  { name: "E", example: "elephant", keycode: "69", src: "sounds/E.wav" },
  { name: "F", example: "frog", keycode: "70", src: "sounds/F.wav" },
  { name: "G", example: "gorilla", keycode: "71", src: "sounds/G.wav" },
  { name: "H", example: "horse", keycode: "72", src: "sounds/H.wav" },
  { name: "I", example: "iguana", keycode: "73", src: "sounds/I.wav" },
  { name: "J", example: "jackal", keycode: "74", src: "sounds/J.wav" },
  { name: "K", example: "koala", keycode: "75", src: "sounds/K.wav" },
  { name: "L", example: "llama", keycode: "76", src: "sounds/L.wav" },
  { name: "M", example: "moose", keycode: "77", src: "sounds/M.wav" },
  { name: "N", example: "newt", keycode: "78", src: "sounds/N.wav" },
  { name: "O", example: "owl", keycode: "79", src: "sounds/O.wav" },
  { name: "P", example: "penguin", keycode: "80", src: "sounds/P.wav" },
  { name: "Q", example: "quail", keycode: "81", src: "sounds/Q.wav" },
  { name: "R", example: "raccoon", keycode: "82", src: "sounds/R.wav" },
  { name: "S", example: "skunk", keycode: "83", src: "sounds/S.wav" },
  { name: "T", example: "turtle", keycode: "84", src: "sounds/T.wav" },
  { name: "U", example: "unicorn", keycode: "85", src: "sounds/U.wav" },
  { name: "V", example: "vulture", keycode: "86", src: "sounds/V.wav" },
  { name: "W", example: "walrus", keycode: "87", src: "sounds/W.wav" },
  { name: "X", example: "x-ray fish", keycode: "88", src: "sounds/X.wav" },
  { name: "Y", example: "yellow jacket", keycode: "89", src: "sounds/Y.wav" },
  { name: "Z", example: "zebra", keycode: "90", src: "sounds/Z.wav" },
];

/**
 * Changed the wrapping element to be a <button>
 * instead of a <div> to make it more accessible
 * for keyboard users who use the tab key to
 * navigate a page.
 *
 * @author Chris Miller <https://github.com/millertchris>
 */
const createLetterCards = (letter) => {
  return `<button class="key" id=${letter.keycode}>
						<kbd>${letter.name}</kbd>
						<span class="item">${letter.example}</span>
						<audio data-key="${letter.keycode}" src="${letter.src}"></audio>
						<img class="back" src="images/${letter.name}.png" alt="${letter.example}"/>
					</button>`;
};

const allCardsBuilt = allCards.map(createLetterCards);

inputWindow.addEventListener("keyup", function (e) {
  if (document.activeElement == !inputWindow) return;
  const getInputText = inputWindow.value
    .toUpperCase()
    .replace(/[^A-Za-z]/g, "")
    .split("");
  const findObjectsForInput = getInputText.map((letter) => {
    return allCards.find((letterName) => {
      return `${letter}` === letterName.name;
    });
  });
  const renderPressedKeys = findObjectsForInput.map(createLetterCards);
  document.getElementById("keyIDPressed").innerHTML = renderPressedKeys;
});

document.getElementById("keyID").innerHTML = allCardsBuilt;

inputWindow.addEventListener("keyup", function (e) {
  const inputDiv = document.getElementById("keyIDPressed");
  const alphaDiv = document.getElementById("keyID");
  if (inputWindow.value.length > 0) {
    return alphaDiv.classList.add("showing");
  } else {
    return alphaDiv.classList.remove("showing");
  }
});

window.addEventListener("keydown", function (e) {
  /**
   * Just learned today that e.keyCode is deprecated
   * and e.key should be used instead, although, it returns
   * a different value than you might expect and all of the other
   * code would need to be refactored. It's not worth it at this
   * point and all of the browser seem to continue supporting e.keyCode
   * for now.
   *
   * @author Chris Miller <https://github.com/millertchris>
   */

  const keyCode = e.keyCode;
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  if (audio) {
    const key = document.getElementById(`${keyCode}`);
    playAudio(audio);
  }

  /**
   * Check to see if the enter key is pressed, if so
   * let's target the audio tag inside of the element
   * that the user pressed enter on.
   *
   * @author Chris Miller <https://github.com/millertchris>
   */
  if (e.key === "Enter") {
    const audio = e.target.querySelector("audio");
    playAudio(audio);
  }
});

/**
 * Pulled our audio pieces together into one
 * function now that's it's use more than once.
 *
 * @author Chris Miller <https://github.com/millertchris>
 */
function playAudio(audio) {
  audio.currentTime = 0;
  audio.closest(".key").classList.add("playing");
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
