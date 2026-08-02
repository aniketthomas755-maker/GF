const typing = document.getElementById("typing");
const startBtn = document.getElementById("startBtn");
const scenes = Array.from(document.querySelectorAll(".scene"));
const giftBox = document.getElementById("giftBox");
const letterText = document.getElementById("letterText");
const audio = document.getElementById("bgAudio");
const playToggle = document.getElementById("playToggle");
const seekBar = document.getElementById("seekBar");
const volumeBar = document.getElementById("volumeBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const floatingPlayerToggle = document.getElementById("floatingPlayerToggle");
const galleryButtons = Array.from(document.querySelectorAll(".gallery-item"));
const galleryModal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");
const book = document.getElementById("book");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const bookFront = document.getElementById("bookFront");
const bookBack = document.getElementById("bookBack");
const progressBar = document.getElementById("progressBar");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizSkip = document.getElementById("quizSkip");
const yesBtn = document.getElementById("yesBtn");
const alwaysBtn = document.getElementById("alwaysBtn");
const finalMessage = document.getElementById("finalMessage");
const celebrationLayer = document.getElementById("celebrationLayer");
const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const lines = [
  "Connecting Hearts...",
  "Loading Memories...",
  "Happy Girlfriend's Day ❤️",
  "Dear Wania..."
];

const letterLines = [
  "My dearest Wania,",
  "",
  "Every moment with you feels like a soft glow in the dark,",
  "a melody I never want to stop hearing.",
  "You make ordinary days feel golden,",
  "and every heartbeat feels a little fuller when I think of you.",
  "",
  "I love your laugh, your warmth, your kindness,",
  "and the way your love makes me feel safe and cherished.",
  "Thank you for being the beautiful light of my life.",
  "",
  "I will always choose you, always adore you,",
  "and always love you forever."
];

const bookPages = [
  { title: "How we met", text: "We met in a moment that felt small at first, and yet it changed the entire color of my life. Every memory after that felt brighter because you were in it." },
  { title: "Our first memories", text: "Our first memories still feel like soft starlight—laughing, lingering, and discovering how naturally our hearts fit together." },
  { title: "Things I love about you", text: "I love your kindness, your grace, your smile, and the quiet way you make everything feel warmer and more beautiful." },
  { title: "Dreams together", text: "I dream of a life made of shared sunsets, quiet mornings, and beautiful little promises that we keep together." },
  { title: "Future", text: "The future feels luminous when I imagine it with you—full of love, tenderness, and forever." }
];

const quizQuestions = [
  { question: "What makes my heart feel safest?", options: ["Your voice", "Your smile", "Your kindness", "Your presence"], answer: 3 },
  { question: "What do I love most about you?", options: ["Your patience", "Your glow", "Your laughter", "All of it"], answer: 3 },
  { question: "What feeling do you bring into my life?", options: ["Peace", "Chaos", "Doubt", "Distance"], answer: 0 },
  { question: "What is our love like?", options: ["A quiet miracle", "A passing breeze", "A cold night", "A distant echo"], answer: 0 },
  { question: "What will I always do?", options: ["Choose you", "Leave you", "Forget you", "Hide from you"], answer: 0 }
];

let lineIndex = 0;
let charIndex = 0;
let currentScene = 0;
let galleryIndex = 0;
let bookPageIndex = 0;
let quizIndex = 0;
let quizScore = 0;
let currentLetterIndex = 0;
let typeTimer = null;
let letterTimer = null;
let counterTimer = null;
let sceneAdvanceTimer = null;
let started = false;
let isPlaying = false;
let isMuted = false;

function showScene(index) {
  if (sceneAdvanceTimer) {
    window.clearTimeout(sceneAdvanceTimer);
    sceneAdvanceTimer = null;
  }

  scenes.forEach((scene, sceneIndex) => {
    scene.classList.toggle("scene-active", sceneIndex === index);
  });
  currentScene = index;

  if (index === 2) {
    sceneAdvanceTimer = window.setTimeout(() => {
      if (currentScene === 2) {
        goNext();
      }
    }, 2200);
  }
}

function typeIntro() {
  if (lineIndex >= lines.length) {
    startBtn.style.display = "inline-block";
    startBtn.style.opacity = "0";
    window.setTimeout(() => {
      startBtn.style.transition = "0.6s ease";
      startBtn.style.opacity = "1";
    }, 80);
    return;
  }

  const line = lines[lineIndex];
  typing.textContent = "";
  charIndex = 0;
  const interval = window.setInterval(() => {
    if (charIndex >= line.length) {
      window.clearInterval(interval);
      lineIndex += 1;
      window.setTimeout(typeIntro, 900);
      return;
    }
    typing.textContent += line[charIndex];
    charIndex += 1;
  }, 70);
}

function revealLetter() {
  if (currentLetterIndex >= letterLines.length) {
    return;
  }
  letterText.textContent += `${letterLines[currentLetterIndex]}\n`;
  currentLetterIndex += 1;
  letterTimer = window.setTimeout(revealLetter, 650);
}

function goNext() {
  if (currentScene < scenes.length - 1) {
    showScene(currentScene + 1);
  }
}

function openGift() {
  if (giftBox.classList.contains("opened")) {
    return;
  }
  giftBox.classList.add("opened");
  window.setTimeout(() => {
    goNext();
      if (audio) {
      audio.currentTime = 0;
      audio.volume = 0.7;
      if (audio.readyState === 0) {
        audio.load();
      }
      audio.play().catch(() => {});
      isPlaying = true;
      updatePlayButton();
    }
  }, 1200);
}

function updatePlayButton() {
  playToggle.textContent = isPlaying ? "Pause" : "Play";
}

function syncTimeUI() {
  if (!audio) {
    return;
  }
  const current = audio.currentTime || 0;
  const duration = audio.duration || 0;
  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(duration);
  if (duration) {
    seekBar.value = (current / duration) * 100;
  }
}

function formatTime(seconds) {
  const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;

}

function startCounter() {
  const startDate = new Date("2026-06-28T00:00:00");
  const tick = () => {
    const now = new Date();
    const diff = now - startDate;
    const totalSeconds = Math.floor(diff / 1000);
    const years = Math.floor(totalSeconds / 31536000);
    const months = Math.floor((totalSeconds % 31536000) / 2592000);
    const days = Math.floor((totalSeconds % 2592000) / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    yearsEl.textContent = String(years).padStart(2, "0");
    monthsEl.textContent = String(months).padStart(2, "0");
    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  };
  tick();
  counterTimer = window.setInterval(tick, 1000);
}

function updateBook() {
  const page = bookPages[bookPageIndex];
  bookFront.innerHTML = `<h3>${page.title}</h3><p>${page.text}</p>`;
  bookBack.innerHTML = `<h3>${page.title}</h3><p>${page.text}</p>`;
}

function turnBook(next) {
  if (next) {
    if (bookPageIndex >= bookPages.length - 1) {
      return;
    }
    bookPageIndex += 1;
  } else if (bookPageIndex > 0) {
    bookPageIndex -= 1;
  } else {
    return;
  }
  book.classList.remove("is-flipping");
  window.setTimeout(() => {
    book.classList.add("is-flipping");
    updateBook();
  }, 20);
}

function renderQuiz() {
  const current = quizQuestions[quizIndex];
  quizQuestion.textContent = `${quizIndex + 1}. ${current.question}`;
  quizOptions.innerHTML = "";
  current.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => handleQuizChoice(optionIndex));
    quizOptions.appendChild(button);
  });
  progressBar.style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
}

function handleQuizChoice(choice) {
  const current = quizQuestions[quizIndex];
  const buttons = Array.from(quizOptions.querySelectorAll(".quiz-option"));
  buttons.forEach((button, index) => {
    if (index === current.answer) {
      button.classList.add("correct");
    } else if (index === choice) {
      button.classList.add("wrong");
    }
  });
  if (choice === current.answer) {
    quizScore += 1;
  }
  window.setTimeout(() => {
    quizIndex += 1;
    if (quizIndex < quizQuestions.length) {
      renderQuiz();
    } else {
      quizQuestion.textContent = `You answered ${quizScore} out of ${quizQuestions.length} beautifully.`;
      quizOptions.innerHTML = "";
      progressBar.style.width = "100%";
    }
  }, 750);
}

function launchCelebration() {
  document.body.classList.add("celebrating");
  celebrationLayer.innerHTML = "";
  for (let i = 0; i < 70; i += 1) {
    const piece = document.createElement("span");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${Math.random() * 100}%`;
    piece.style.setProperty("--size", `${Math.random() * 12 + 8}px`);
    piece.style.width = `${Math.random() * 8 + 6}px`;
    piece.style.height = `${Math.random() * 12 + 8}px`;
    if (i % 2 === 0) {
      piece.classList.add("confetti");
    }
    celebrationLayer.appendChild(piece);
  }
  if (audio) {
    audio.volume = 1;
  }
  finalMessage.classList.add("visible");
}

function openGallery(index) {
  const safeIndex = Number.isInteger(index) ? index : 0;
  if (!galleryButtons[safeIndex]) {
    return;
  }

  galleryIndex = safeIndex;
  const button = galleryButtons[safeIndex];
  const img = button.querySelector("img");
  if (!img) {
    return;
  }

  modalImage.src = img.src;
  modalImage.alt = img.alt;
  galleryModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeGallery() {
  galleryModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function changeGallery(step) {
  if (!galleryButtons.length) {
    return;
  }

  galleryIndex = (galleryIndex + step + galleryButtons.length) % galleryButtons.length;
  const button = galleryButtons[galleryIndex];
  const img = button?.querySelector("img");
  if (!img) {
    return;
  }

  modalImage.src = img.src;
  modalImage.alt = img.alt;
}

function attachEvents() {
  startBtn.addEventListener("click", () => {
    showScene(1);
    started = true;
  });

  giftBox.addEventListener("click", openGift);
  giftBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGift();
    }
  });

  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextId = button.getAttribute("data-next");
      const nextScene = scenes.findIndex((scene) => scene.id === nextId);
      if (nextScene >= 0) {
        showScene(nextScene);
      }
    });
  });

  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => openGallery(Number(button.dataset.index)));
  });

  modalClose.addEventListener("click", closeGallery);
  galleryModal.addEventListener("click", (event) => {
    if (event.target === galleryModal) {
      closeGallery();
    }
  });
  modalPrev.addEventListener("click", () => changeGallery(-1));
  modalNext.addEventListener("click", () => changeGallery(1));

  document.addEventListener("keydown", (event) => {
    if (galleryModal.hidden) {
      return;
    }
    if (event.key === "Escape") {
      closeGallery();
    } else if (event.key === "ArrowLeft") {
      changeGallery(-1);
    } else if (event.key === "ArrowRight") {
      changeGallery(1);
    }
  });

  prevPage.addEventListener("click", () => turnBook(false));
  nextPage.addEventListener("click", () => turnBook(true));

  playToggle.addEventListener("click", () => {
    if (!audio) {
      return;
    }
    if (audio.paused) {
      audio.play().catch(() => {});
      isPlaying = true;
    } else {
      audio.pause();
      isPlaying = false;
    }
    updatePlayButton();
  });

  seekBar.addEventListener("input", () => {
    if (!audio || !Number.isFinite(audio.duration)) {
      return;
    }
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  });

  volumeBar.addEventListener("input", () => {
    if (!audio) {
      return;
    }
    audio.volume = Number(volumeBar.value) / 100;
  });

  floatingPlayerToggle.addEventListener("click", () => {
    const player = document.querySelector(".music-card");
    player.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  yesBtn.addEventListener("click", launchCelebration);
  alwaysBtn.addEventListener("click", launchCelebration);

  audio.addEventListener("timeupdate", syncTimeUI);
  audio.addEventListener("loadedmetadata", syncTimeUI);
  audio.addEventListener("ended", () => {
    isPlaying = false;
    updatePlayButton();
  });
}

function init() {
  showScene(0);
  startBtn.style.display = "inline-block";
  startBtn.style.opacity = "0";
  window.setTimeout(() => {
    startBtn.style.transition = "0.6s ease";
    startBtn.style.opacity = "1";
  }, 100);
  updatePlayButton();
  updateBook();
  renderQuiz();
  startCounter();
  revealLetter();
  typeIntro();
  attachEvents();
}

window.addEventListener("load", init);