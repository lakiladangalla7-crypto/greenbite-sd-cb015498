/* ======================
   NAVBAR TOGGLE (Animated)
====================== */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open"); // toggle animation class
});

/* ======================
   HERO AUTO-ROTATING MAIN HEADING
====================== */
const heroHeading = document.getElementById("hero-heading");
if (heroHeading) {
  const slogans = [
    "Eat Healthy, Live Better",
    "Fuel Your Body, Fuel Your Life",
    "Healthy Eating, Happy Living",
    "Good Food, Good Mood",
    "Small Choices, Big Changes",
    "Your Health, Your Wealth"
  ];

  let index = 0;
  function rotateSlogan() {
    heroHeading.style.opacity = 0;
    setTimeout(() => {
      heroHeading.textContent = slogans[index];
      heroHeading.style.opacity = 1;
      index = (index + 1) % slogans.length;
    }, 600);
  }
  setInterval(rotateSlogan, 3000);
  rotateSlogan();
}

/* ======================
   HERO AUTO QUOTES
====================== */
const heroQuote = document.getElementById("hero-quote");
if (heroQuote) {
  const quotes = [
    "Healthy habits create a healthy future.",
    "Nourish your body, nourish your soul.",
    "Balance is the key to happiness.",
    "Wellness starts with a single bite."
  ];

  let qIndex = 0;
  function changeQuote() {
    heroQuote.style.opacity = 0;
    setTimeout(() => {
      heroQuote.textContent = quotes[qIndex];
      heroQuote.style.opacity = 1;
      qIndex = (qIndex + 1) % quotes.length;
    }, 600);
  }
  setInterval(changeQuote, 4000);
  changeQuote();
}

/* ======================
   HEALTH TIP OF THE DAY
====================== */
const tips = [
  "Drink at least 8 glasses of water daily",
  "Take a 10-minute walk after meals",
  "Eat more colorful fruits and veggies",
  "Practice mindful eating — chew slowly",
  "Get 7-8 hours of quality sleep",
  "Stretch for 5 minutes every morning"
];
const today = new Date().getDate(); // 1–31
const dailyTipText = document.getElementById("daily-tip-text");
if (dailyTipText) {
  const tipIndex = today % tips.length;
  dailyTipText.textContent = tips[tipIndex];
}

/* ======================
   NEWSLETTER SUBSCRIBE
====================== */
document.getElementById("newsletter-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  if (email) {
    localStorage.setItem("newsletterEmail", email);
    alert("Subscribed successfully!");
    e.target.reset();
  } else {
    alert("Please enter a valid email!!!");
  }
});



/* ================================================RECIPES - SEARCH & FILTER=============================================================== */


const searchInput = document.getElementById("recipe-search");
const recipeCards = document.querySelectorAll(".recipe-card");
const filterBtns = document.querySelectorAll(".filter-btn");
let currentFilter = "all";

function filterRecipes() {
  const term = searchInput?.value.toLowerCase() || "";
  recipeCards.forEach (function(card) {
    const matchesSearch = card.textContent.toLowerCase().includes(term);
    const matchesFilter = currentFilter === "all" || card.dataset.category === currentFilter;
    card.style.display = matchesSearch && matchesFilter ? "block" : "none";
  });
}

searchInput?.addEventListener("input", filterRecipes);

filterBtns.forEach(btn => {
  btn.addEventListener("click", function(){
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    filterRecipes();
  });
}
);


/* =========================================================RECIPES - MODAL================================================================ */


const modal = document.getElementById("recipe-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalIngredients = document.getElementById("modal-ingredients");
const modalSteps = document.getElementById("modal-steps");
const modalNutrition = document.getElementById("modal-nutrition");
const closeModal = document.getElementById("close-modal");

document.querySelectorAll(".recipe-card button")?.forEach(function(btn) {
  btn.addEventListener("click", function(e) {
    const card = e.target.closest(".recipe-card");
    modal.style.display = "flex";
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalDesc.textContent = card.querySelector("p").textContent;

    // Ingredients
    modalIngredients.innerHTML = "";
    card.dataset.ingredients.split(",").forEach (function(item) {
      modalIngredients.innerHTML += `<li>${item.trim()}</li>`;
    });

    // Steps
    modalSteps.innerHTML = "";
    card.dataset.steps.split(",").forEach(function(step) {
      modalSteps.innerHTML += `<li>${step.trim()}</li>`;
    });

    // Nutrition
    const [cal, pro, carb, fat] = card.dataset.nutrition.split(",");
    modalNutrition.innerHTML = `
      <tr><th>Calories</th><th>Protein (g)</th><th>Carbs (g)</th><th>Fat (g)</th></tr>
      <tr><td>${cal}</td><td>${pro}</td><td>${carb}</td><td>${fat}</td></tr>
    `;
  });
}
);

closeModal?.addEventListener("click", () => { modal.style.display = "none"; });
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });


/* =========================================== CALORIE CALCULATOR ======================================================================== */


document.getElementById("calc-form")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const age = +document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const height = +document.getElementById("height").value;
  const weight = +document.getElementById("weight").value;
  const activity = +document.getElementById("activity").value;

  let BMR = 0;
  if (gender === "male") {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  const TDEE = BMR * activity;

  const carbs = (TDEE * 0.5) / 4;
  const protein = (TDEE * 0.2) / 4;
  const fat = (TDEE * 0.3) / 9;

  document.getElementById("bmr").textContent = BMR.toFixed(0);
  document.getElementById("tdee").textContent = TDEE.toFixed(0);

  const carbsBar = document.getElementById("carbs-bar");
  const proteinBar = document.getElementById("protein-bar");
  const fatBar = document.getElementById("fat-bar");

  carbsBar.style.width = "0%";
  proteinBar.style.width = "0%";
  fatBar.style.width = "0%";

  setTimeout(() => {
    carbsBar.style.width = "50%";
    carbsBar.textContent = `Carbs ${carbs.toFixed(0)}g`;

    proteinBar.style.width = "20%";
    proteinBar.textContent = `Protein ${protein.toFixed(0)}g`;

    fatBar.style.width = "30%";
    fatBar.textContent = `Fat ${fat.toFixed(0)}g`;
  }, 200);
}
);



/* =========================================  WORKOUT GENERATOR  ========================================================================= */
const workoutsDB = {
  full: [
    { name: "Jumping Jacks", none: true, dumbbells: false },
    { name: "Burpees", none: true, dumbbells: false },
    { name: "Mountain Climbers", none: true, dumbbells: false },
    { name: "Plank", none: true, dumbbells: false },
    { name: "High Knees", none: true, dumbbells: false },
    { name: "Dumbbell Thrusters", none: false, dumbbells: true },
    { name: "Dumbbell Deadlifts", none: false, dumbbells: true }
  ],
  arms: [
    { name: "Push-ups", none: true, dumbbells: false },
    { name: "Tricep Dips (chair)", none: true, dumbbells: false },
    { name: "Diamond Push-ups", none: true, dumbbells: false },
    { name: "Bicep Curls", none: false, dumbbells: true },
    { name: "Shoulder Press", none: false, dumbbells: true },
    { name: "Hammer Curls", none: false, dumbbells: true }
  ],
  legs: [
    { name: "Squats", none: true, dumbbells: false },
    { name: "Lunges", none: true, dumbbells: false },
    { name: "Glute Bridges", none: true, dumbbells: false },
    { name: "Calf Raises", none: true, dumbbells: false },
    { name: "Goblet Squats", none: false, dumbbells: true },
    { name: "Romanian Deadlifts", none: false, dumbbells: true }
  ]
};

// Configuration (you can tweak these without changing the UI)
const EXERCISES_PER_PLAN = 5;     // how many exercises to generate
const SECONDS_PER_EXERCISE = 30;  // timer per exercise (seconds)

const formEl = document.getElementById("workout-form");
const planEl = document.getElementById("workout-plan");
const countdownEl = document.getElementById("countdown");
const timerBarFill = document.querySelector("#timer-bar span");
const beep = document.getElementById("beep-audio");

let currentPlan = [];
let currentIndex = -1;
let intervalId = null;
let barAnimId = null;

function shuffle(arr) {
  return arr
    .map(v => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(o => o.v);
}

function buildPlan(bodypart, equipment) {
  const list = workoutsDB[bodypart] || [];
  const allowDumbbells = equipment === "dumbbells";
  const filtered = list.filter(item => allowDumbbells ? item.dumbbells || item.none : item.none);
  const picked = shuffle(filtered).slice(0, EXERCISES_PER_PLAN);

  // If dumbbells selected, append label
  return picked.map(item => ({
    display: item.name + (allowDumbbells && item.dumbbells ? " (Dumbbells)" : ""),
    base: item.name
  }));
}

function renderPlan(plan) {
  planEl.innerHTML = "";
  plan.forEach((ex, i) => {
    const div = document.createElement("div");
    div.className = "exercise";
    div.dataset.index = i;
    div.textContent = `${i + 1}. ${ex.display}`;
    planEl.appendChild(div);
  });
}

function setActiveCard(idx) {
  [...planEl.querySelectorAll(".exercise")].forEach(card => card.classList.remove("active"));
  const target = planEl.querySelector(`.exercise[data-index="${idx}"]`);
  if (target) target.classList.add("active");
}

function clearTimers() {
  if (intervalId) clearInterval(intervalId);
  if (barAnimId) cancelAnimationFrame(barAnimId);
  intervalId = null;
  barAnimId = null;
}

function playBeep() {
  if (!beep) return;
  // rewind then play
  beep.currentTime = 0;
  beep.play().catch(() => {});
}

function runTimer(seconds, onDone) {
  const start = Date.now();
  const end = start + seconds * 1000;

  function update() {
    const now = Date.now();
    const remaining = Math.max(0, Math.ceil((end - now) / 1000));
    const pct = Math.min(100, ((seconds - remaining) / seconds) * 100);

    countdownEl.textContent = `⏱️ ${remaining}s left`;
    timerBarFill.style.width = `${pct}%`;

    if (remaining <= 0) {
      playBeep();
      onDone?.();
    } else {
      barAnimId = requestAnimationFrame(update);
    }
  }
  update();
}

function startExerciseSequence() {
  currentIndex = 0;
  nextExercise();
}

function nextExercise() {
  clearTimers();
  if (currentIndex >= currentPlan.length) {
    countdownEl.textContent = "Workout complete! Great job!";
    timerBarFill.style.width = "100%";
    return;
  }

  setActiveCard(currentIndex);
  timerBarFill.style.width = "0%";
  runTimer(SECONDS_PER_EXERCISE, () => {
    currentIndex += 1;
    nextExercise();
  });
}

formEl?.addEventListener("submit", (e) => {
  e.preventDefault();
  clearTimers();

  const bodypart = document.getElementById("bodypart").value;     // full | arms | legs
  const equipment = document.getElementById("equipment").value;   // none | dumbbells

  currentPlan = buildPlan(bodypart, equipment);
  if (currentPlan.length === 0) {
    planEl.innerHTML = `<div class="exercise">No exercises available for this selection.</div>`;
    countdownEl.textContent = "";
    timerBarFill.style.width = "0%";
    return;
  }

  renderPlan(currentPlan);
  countdownEl.textContent = "Get ready… starting in 3s";
  timerBarFill.style.width = "0%";

  // Small 3-second prep, then start sequence
  let prep = 3;
  const prepInt = setInterval(() => {
    prep--;
    countdownEl.textContent = prep > 0 ? `Get ready… ${prep}s` : "Go!";
    if (prep <= 0) {
      clearInterval(prepInt);
      startExerciseSequence();
    }
  }, 1000);
});




/* =========================================================  MINDFULNESS  =============================================================== */

// --- DOM lookups (guarded by existence so other pages don't error)
const elCircle = document.getElementById("breathing-circle");
if (elCircle) {
  const elText = document.getElementById("breathing-text");
  const elTimer = document.getElementById("breathing-timer");
  const btnStart = document.getElementById("start-breathing");
  const btnReset = document.getElementById("reset-breathing");
  const btnSound = document.getElementById("toggle-sound");
  const audio = document.getElementById("ambient-audio");

  const selInhale = document.getElementById("inp-inhale");
  const selHold   = document.getElementById("inp-hold");
  const selExhale = document.getElementById("inp-exhale");
  const inpCycles = document.getElementById("inp-cycles");

  const statBreath = document.getElementById("stat-breath");
  const statTimer  = document.getElementById("stat-timer");
  const statTotal  = document.getElementById("stat-total");

  // ----- session storage helpers
  const getCount = (key) => parseInt(localStorage.getItem(key) || "0", 10);
  const setCount = (key, val) => localStorage.setItem(key, String(val));
  const incCount = (key) => setCount(key, getCount(key) + 1);
  function refreshStats() {
    const b = getCount("mind_breath_sessions");
    const t = getCount("mind_timer_sessions");
    statBreath.textContent = b;
    statTimer.textContent = t;
    statTotal.textContent = b + t;
  }
  refreshStats();

  // ----- ambient sound toggle
  let soundOn = false;
  btnSound.addEventListener("click", () => {
    soundOn = !soundOn;
    audio.volume = 0.35;
    if (soundOn) {
      audio.play().catch(()=>{});
      btnSound.textContent = "Sound: On";
    } else {
      audio.pause();
      btnSound.textContent = "Sound: Off";
    }
  });

  // ----- breathing state
  let running = false;
  let cycleIdx = 0;
  let phaseIdx = 0; // 0=inhale,1=hold (optional),2=exhale
  let phaseInterval = null;
  let phaseTimeout = null;

  function setCircle(scale, sec) {
    elCircle.style.transition = `transform ${sec}s ease-in-out`;
    elCircle.style.transform = `scale(${scale})`;
  }

  function clearPhaseTimers() {
    if (phaseInterval) clearInterval(phaseInterval);
    if (phaseTimeout) clearTimeout(phaseTimeout);
    phaseInterval = null;
    phaseTimeout = null;
  }

  function updateTimerLabel(cycleNow, cycleTotal, phaseName, remain) {
    elTimer.textContent = `Cycle ${cycleNow}/${cycleTotal} — ${phaseName} ${remain}s`;
  }

  function nextPhase() {
    const inhale = parseInt(selInhale.value, 10);
    const hold   = parseInt(selHold.value,   10);
    const exhale = parseInt(selExhale.value, 10);
    const totalCycles = Math.max(1, parseInt(inpCycles.value || "5", 10));

    const phases = [
      { name: "Inhale", dur: inhale, scale: 1.6 },
      ...(hold > 0 ? [{ name: "Hold", dur: hold, scale: 1.6 }] : []),
      { name: "Exhale", dur: exhale, scale: 1.0 }
    ];

    if (!running) return;

    const p = phases[phaseIdx];
    elText.textContent = p.name + "…";
    setCircle(p.scale, p.dur);

    // countdown
    let remain = p.dur;
    updateTimerLabel(cycleIdx + 1, totalCycles, p.name, remain);
    clearPhaseTimers();
    phaseInterval = setInterval(() => {
      remain -= 1;
      if (remain >= 0) updateTimerLabel(cycleIdx + 1, totalCycles, p.name, remain);
    }, 1000);

    phaseTimeout = setTimeout(() => {
      clearPhaseTimers();
      phaseIdx += 1;

      if (phaseIdx >= phases.length) {
        // next cycle
        phaseIdx = 0;
        cycleIdx += 1;
        if (cycleIdx >= totalCycles) {
          // finished session
          running = false;
          elText.textContent = "Finished 🙌";
          elTimer.textContent = "Done!";
          btnStart.textContent = "Start Breathing";
          incCount("mind_breath_sessions");
          refreshStats();
          return;
        }
      }
      nextPhase();
    }, p.dur * 1000);
  }

  function startBreathing() {
    if (running) {
      // pause
      running = false;
      clearPhaseTimers();
      btnStart.textContent = "Resume";
      elText.textContent = "Paused";
      return;
    }
    // start or resume
    running = true;
    btnStart.textContent = "Pause";
    nextPhase();
  }

  function resetBreathing() {
    running = false;
    clearPhaseTimers();
    cycleIdx = 0;
    phaseIdx = 0;
    elCircle.style.transition = "transform .3s ease";
    elCircle.style.transform = "scale(1)";
    elText.textContent = "Ready?";
    elTimer.textContent = "0s";
    btnStart.textContent = "Start Breathing";
  }

  btnStart.addEventListener("click", startBreathing);
  btnReset.addEventListener("click", resetBreathing);

  // -------------------- Timer Tools (Meditation + Pomodoro)
  // tab switch
  document.querySelectorAll(".timer-tabs .tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".timer-tabs .tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".timer-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // ---- Meditation timer
  const medMinutes = document.getElementById("med-minutes");
  const medDisplay = document.getElementById("med-display");
  const medStart   = document.getElementById("med-start");
  const medReset   = document.getElementById("med-reset");
  let medRunning = false;
  let medRemain = parseInt(medMinutes.value,10) * 60;
  let medInt = null;

  function fmt(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2,"0")}`;
    }
  function medUpdate() { medDisplay.textContent = fmt(medRemain); }

  medMinutes.addEventListener("input", () => {
    if (!medRunning) {
      medRemain = Math.max(1, parseInt(medMinutes.value||"1",10)) * 60;
      medUpdate();
    }
  });

  medStart.addEventListener("click", () => {
    if (!medRunning) {
      medRunning = true;
      medStart.textContent = "Pause";
      medInt = setInterval(() => {
        medRemain -= 1;
        if (medRemain <= 0) {
          clearInterval(medInt);
          medRunning = false;
          medStart.textContent = "Start";
          medDisplay.textContent = "Done!";
          incCount("mind_timer_sessions");
          refreshStats();
        } else {
          medUpdate();
        }
      }, 1000);
    } else {
      medRunning = false;
      medStart.textContent = "Start";
      clearInterval(medInt);
    }
  });

  medReset.addEventListener("click", () => {
    clearInterval(medInt);
    medRunning = false;
    medStart.textContent = "Start";
    medRemain = Math.max(1, parseInt(medMinutes.value||"1",10)) * 60;
    medUpdate();
  });

  // ---- Pomodoro
  const pFocus  = document.getElementById("pomo-focus");
  const pBreak  = document.getElementById("pomo-break");
  const pRounds = document.getElementById("pomo-rounds");
  const pDisplay= document.getElementById("pomo-display");
  const pStatus = document.getElementById("pomo-status");
  const pStart  = document.getElementById("pomo-start");
  const pReset  = document.getElementById("pomo-reset");

  let pRunning=false, pMode="focus", pRemain=0, pRound=1, pInt=null;

  function pSetup(resetAll=true) {
    if (resetAll) pRound = 1, pMode = "focus";
    pRemain = Math.max(1, parseInt(pFocus.value||"25",10)) * 60;
    pDisplay.textContent = fmt(pRemain);
    pStatus.textContent = `Focus — Round ${pRound}/${Math.max(1,parseInt(pRounds.value||"1",10))}`;
  }
  pSetup();

  pStart.addEventListener("click", () => {
    if (!pRunning) {
      pRunning = true;
      pStart.textContent = "Pause";
      pInt = setInterval(() => {
        pRemain -= 1;
        if (pRemain <= 0) {
          // switch phase
          if (pMode === "focus") {
            const roundsTotal = Math.max(1, parseInt(pRounds.value||"1",10));
            if (pRound >= roundsTotal) {
              // session finished
              clearInterval(pInt);
              pRunning = false;
              pStart.textContent = "Start";
              pStatus.textContent = "All rounds complete 🎉";
              pDisplay.textContent = "Done!";
              incCount("mind_timer_sessions");
              refreshStats();
              return;
            } else {
              // go to break
              pMode = "break";
              pRemain = Math.max(1, parseInt(pBreak.value||"5",10)) * 60;
              pStatus.textContent = `Break — Round ${pRound}/${roundsTotal}`;
            }
          } else {
            // break over -> next round focus
            pRound += 1;
            pMode = "focus";
            const roundsTotal = Math.max(1, parseInt(pRounds.value||"1",10));
            pRemain = Math.max(1, parseInt(pFocus.value||"25",10)) * 60;
            pStatus.textContent = `Focus — Round ${pRound}/${roundsTotal}`;
          }
        }
        pDisplay.textContent = fmt(pRemain);
      }, 1000);
    } else {
      pRunning = false;
      pStart.textContent = "Start";
      clearInterval(pInt);
    }
  });

  pReset.addEventListener("click", () => {
    clearInterval(pInt);
    pRunning = false;
    pStart.textContent = "Start";
    pSetup(true);
  });
}




/* =====================================================  CONTACT FORM + FAQ  ============================================================ */
document.getElementById("contact-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("contact-email").value;
  const message = document.getElementById("message").value;

  if (name && email && message) {
    localStorage.setItem("feedback", JSON.stringify({ name, email, message }));
    document.getElementById("feedback-msg").textContent = "Thank you for your feedback!";
    e.target.reset();
  } else {
    alert("Please fill in all fields!");
  }
});

document.querySelectorAll(".accordion-btn")?.forEach (function(btn){
  btn.addEventListener("click", function() {
    const content = btn.nextElementSibling;
    const isOpen = content.style.display === "block";
    document.querySelectorAll(".accordion-content").forEach(c => c.style.display = "none");
    if (!isOpen) content.style.display = "block";
  });
});
