/* =========================================================
   EDIT BAGIAN INI untuk personalisasi isi website
   ========================================================= */
const CONFIG = {
  music: "assets/music.mp3",          // taruh lagu favorit kalian di sini (opsional)
  journey: [
    { t: "The Beginning",     m: "Everything started with a dream and a lot of courage. I'm proud you took the first step." },
    { t: "The Challenges",    m: "There were days that felt heavy, but you kept going anyway. That's real strength." },
    { t: "The Hard Work",     m: "All those late nights and tired eyes. I saw every bit of your effort, Sayang." },
    { t: "The Preparation",   m: "You prepared with so much care. You were ready, even when you didn't feel it." },
    { t: "The Proposal Day",  m: "And you did it. You stood there and made it happen. I'm so, so proud of you." }
  ],
  reasons: [
    { t: "Your Strength",   m: "Because you never give up." },
    { t: "Your Patience",   m: "Because you keep trying." },
    { t: "Your Courage",    m: "Because you face every challenge." },
    { t: "Your Dedication", m: "Because you give your best." },
    { t: "And the fifth reason?", m: "Simply because you're you. And that's already more than enough." }
  ],
  // Taruh foto di folder assets/photos/ lalu sesuaikan nama file & caption
  photos: [
    { src: "assets/photos/1.jpg", cap: "My Love Sempro" },
    { src: "assets/photos/2.jpg", cap: "One Step Closer Become Doctor" },
    { src: "assets/photos/3.jpg", cap: "Always smiling & Beautiful" },
    { src: "assets/photos/4.jpg", cap: "My Love Wifey" },
    { src: "assets/photos/5.jpg", cap: "My Love Win Championship" },
    { src: "assets/photos/6.jpg", cap: "To many more" }
  ],
  // Surat: ganti sesuai cerita kalian. Ini hanya contoh awal.
  letter:
`Hey, Sayang ♡

I wanted to write this slowly, because you deserve words that are not rushed.

I've watched you work so hard for this. Through the tired days, the doubts, and the moments you thought you couldn't do it, you kept going. And now you've passed your seminar proposal. I'm so proud of you, I can hardly put it into words.

Thank you for being you: patient, brave, and so determined. You make everyone around you, especially me, want to be better.

Whatever comes next, I'll be right here, cheering the loudest.

With all my love,
Mas ❤️`,
  quiz: [
    { q: "Who loves you the most?",
      o: ["Your best friend", "Your family", "Your favorite person (Mas) ❤️"], a: 2 },
    { q: "Who is your biggest supporter?",
      o: ["Your best friend", "Your family", "Your favorite person (Mas) ❤️"], a: 2 },
    { q: "What's my favorite thing about you?",
      o: ["Your smile", "Your kindness", "Your determination", "Everything about you"], a: 3 },
    { q: "Who will always be there for you?",
      o: ["Your best friend", "Your family", "Your favorite person (Mas) ❤️"], a: 2 }
  ],
  right: "Hehe, you got it right! ♡",
  wrong: "Wrong answer! But I'll give you another chance because I love you.",
  done:  "Congratulations! You unlocked your surprise."
};
/* ========================================================= */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- Floating ornaments ---------- */
function floaties(el, n = 14) {
  const sym = ["♡", "✿", "✦", "❀", "♥"];
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = "floaty";
    s.textContent = sym[i % sym.length];
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = 12 + Math.random() * 18 + "px";
    s.style.animationDuration = 9 + Math.random() * 10 + "s";
    s.style.animationDelay = -Math.random() * 12 + "s";
    el.appendChild(s);
  }
}
$$(".floaties").forEach(f => floaties(f));

/* ---------- Confetti ---------- */
const cv = $("#confetti"), cx = cv.getContext("2d");
let parts = [], running = false;
function sizeCv() { cv.width = innerWidth; cv.height = innerHeight; }
addEventListener("resize", sizeCv); sizeCv();
function burst(count = 160) {
  const cols = ["#F3DDE2", "#D9A2AF", "#f7c9d4", "#f7d38a", "#ffffff", "#c97f90"];
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2, v = 6 + Math.random() * 10;
    parts.push({
      x: innerWidth / 2, y: innerHeight * .4,
      vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5,
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
      r: Math.random() * 6, vr: (Math.random() - .5) * .3,
      c: cols[(Math.random() * cols.length) | 0], life: 180 + Math.random() * 80
    });
  }
  if (!running) { running = true; requestAnimationFrame(tick); }
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => {
    p.vy += .22; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life--;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
    cx.globalAlpha = Math.min(1, p.life / 60);
    cx.fillStyle = p.c; cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore();
  });
  parts = parts.filter(p => p.life > 0 && p.y < cv.height + 40);
  if (parts.length) requestAnimationFrame(tick); else running = false;
}

/* ---------- Music ---------- */
const audio = new Audio(); audio.loop = true; audio.volume = .6;
let musicOk = true;
audio.src = CONFIG.music;
audio.addEventListener("error", () => { musicOk = false; $("#musicBtn").hidden = true; });
const musicBtn = $("#musicBtn");
function setPlaying(on) { musicBtn.classList.toggle("playing", on); }
musicBtn.addEventListener("click", () => {
  if (audio.paused) { audio.play().then(() => setPlaying(true)).catch(() => {}); }
  else { audio.pause(); setPlaying(false); }
});

/* ---------- Build: Timeline ---------- */
const tl = $("#timeline");
CONFIG.journey.forEach(j => {
  const li = document.createElement("li");
  li.className = "tl-item";
  li.innerHTML = `<button class="tl-btn">${j.t}</button><p class="tl-msg">${j.m}</p>`;
  li.querySelector("button").addEventListener("click", () => li.classList.toggle("open"));
  tl.appendChild(li);
});

/* ---------- Build: Reason cards ---------- */
let opened = 0;
const cards = $("#cards");
CONFIG.reasons.forEach((r, i) => {
  const c = document.createElement("div");
  c.className = "card reveal";
  c.style.transitionDelay = i * .1 + "s";
  c.innerHTML = `<div class="card-in">
    <div class="face front">0${i + 1} ♡<small>TAP ME</small></div>
    <div class="face back"><h3>${r.t}</h3><p>${r.m}</p></div></div>`;
  c.addEventListener("click", () => {
    if (c.classList.contains("open")) return;
    c.classList.add("open");
    $("#reasonCount").textContent = ++opened;
    if (opened === CONFIG.reasons.length) burst(90);
  });
  cards.appendChild(c);
});

/* ---------- Build: Polaroids ---------- */
const pol = $("#polaroids");
CONFIG.photos.forEach((p, i) => {
  const d = document.createElement("div");
  d.className = "polaroid reveal";
  d.style.setProperty("--rot", ((i % 2 ? 1 : -1) * (2 + (i * 1.7) % 4)) + "deg");
  d.style.transitionDelay = i * .08 + "s";
  d.innerHTML = `<div class="ph">♡</div><p>${p.cap}</p>`;
  const ph = d.querySelector(".ph");
  const img = new Image();
  img.onload = () => { ph.style.backgroundImage = `url(${p.src})`; ph.textContent = ""; d.dataset.ok = "1"; };
  img.src = p.src;
  d.addEventListener("click", () => {
    const box = $("#lbImg");
    box.style.backgroundImage = d.dataset.ok ? `url(${p.src})` : "none";
    box.textContent = d.dataset.ok ? "" : "♡";
    $("#lbCap").textContent = p.cap;
    $("#lightbox").hidden = false;
  });
  pol.appendChild(d);
});
$("#lightbox").addEventListener("click", () => ($("#lightbox").hidden = true));

/* ---------- Letter ---------- */
let typed = false, typing = false;
$("#readBtn").addEventListener("click", async () => {
  const env = $("#envelope");
  env.classList.add("open");
  $("#readBtn").style.display = "none";
  if (typed || typing) return;
  typing = true;
  await sleep(1100);
  const box = $("#letterText"); box.classList.add("typing");
  for (const ch of CONFIG.letter) {
    box.textContent += ch;
    box.parentElement.scrollTop = box.parentElement.scrollHeight;
    await sleep(ch === "\n" ? 140 : 28);
  }
  box.classList.remove("typing");
  typed = true; typing = false;
});

/* ---------- Quiz ---------- */
let qi = 0, quizDone = false;
function renderQuiz() {
  const card = $("#quizCard");
  if (qi >= CONFIG.quiz.length) {
    quizDone = true;
    card.innerHTML = `<p class="unlock">${CONFIG.done}</p><p class="q-fb">You unlocked your final surprise! ♡</p>
      <button class="btn" id="toFinal">Go to the final surprise</button>`;
    burst(120);
    unlockFinal();
    $("#toFinal").addEventListener("click", () => $("#final").scrollIntoView({ behavior: "smooth" }));
    return;
  }
  const q = CONFIG.quiz[qi];
  card.innerHTML = `<p class="q-step">QUESTION ${qi + 1} / ${CONFIG.quiz.length}</p>
    <p class="q-text">${q.q}</p>
    ${q.o.map((o, i) => `<button class="opt" data-i="${i}">${String.fromCharCode(65 + i)}. ${o}</button>`).join("")}
    <p class="q-fb" id="qfb"></p>`;
  $$(".opt", card).forEach(b => b.addEventListener("click", async () => {
    const ok = +b.dataset.i === q.a, fb = $("#qfb");
    if (ok) {
      b.classList.add("right"); fb.textContent = CONFIG.right;
      $$(".opt", card).forEach(x => (x.disabled = true));
      await sleep(1300); qi++; renderQuiz();
    } else {
      b.classList.add("wrong"); fb.textContent = CONFIG.wrong;
      setTimeout(() => b.classList.remove("wrong"), 600);
    }
  }));
}

/* ---------- Final ---------- */
let finalPlayed = false;
function unlockFinal() {
  $("#finalLocked").hidden = true;
  $("#finalContent").hidden = false;
}
async function playFinal() {
  if (!quizDone || finalPlayed) return;
  finalPlayed = true;
  const field = $("#heartField"), fin = $("#final");
  const W = fin.clientWidth, H = fin.clientHeight;
  for (let i = 0; i < 28; i++) {
    const h = document.createElement("span");
    h.className = "fheart"; h.textContent = "♥";
    h.style.left = Math.random() * W + "px"; h.style.top = (Math.random() < .5 ? -30 : H + 30) + "px";
    field.appendChild(h);
    requestAnimationFrame(() => {
      h.style.opacity = 1;
      h.style.left = W / 2 + (Math.random() - .5) * 120 + "px";
      h.style.top = H * .45 + (Math.random() - .5) * 120 + "px";
    });
    await sleep(60);
  }
  await sleep(1800);
  field.innerHTML = "";
  const fl = ["✿", "❀", "🌸", "🌷"];
  for (let i = 0; i < 18; i++) {
    const f = document.createElement("span");
    f.className = "flower"; f.textContent = fl[i % fl.length];
    f.style.left = 4 + Math.random() * 90 + "%"; f.style.top = 4 + Math.random() * 90 + "%";
    field.appendChild(f);
    setTimeout(() => f.classList.add("in"), i * 120);
  }
  burst(100);
  await sleep(800);
  $("#finalMsg").classList.add("show");
  $("#finalContent").classList.add("go");
}

/* ---------- Open / Replay ---------- */
let obs;
function setupObservers() {
  obs && obs.disconnect();
  obs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      if (e.target.id === "final") playFinal();
    }
  }), { threshold: .2 });
  $$(".reveal, .tl-item, #final").forEach(el => obs.observe(el));

  const secs = $$("main section");
  const dots = $$("#progress a");
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      const i = secs.indexOf(e.target);
      dots.forEach((d, k) => d.classList.toggle("on", k === i));
    }
  }), { threshold: .5 });
  secs.forEach(s => so.observe(s));
}
function buildProgress() {
  const nav = $("#progress"); nav.innerHTML = "";
  $$("main section").forEach(s => {
    const a = document.createElement("a");
    a.href = "#" + s.id; a.title = s.dataset.title || "";
    nav.appendChild(a);
  });
}

$("#openBtn").addEventListener("click", () => {
  $("#welcome").classList.add("hide");
  document.body.classList.remove("locked");
  $("#main").hidden = false;
  $("#progress").hidden = false;
  if (musicOk) {
    musicBtn.hidden = false;
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }
  window.scrollTo(0, 0);
  buildProgress(); setupObservers();
  setTimeout(() => burst(200), 500);
});
$("#boomBtn").addEventListener("click", () => burst(220));

$("#replayBtn").addEventListener("click", () => {
  qi = 0; quizDone = false; finalPlayed = false; opened = 0; typed = false; typing = false;
  $("#reasonCount").textContent = 0;
  $$(".card").forEach(c => c.classList.remove("open"));
  $$(".tl-item").forEach(i => i.classList.remove("open"));
  $("#envelope").classList.remove("open"); $("#readBtn").style.display = "";
  $("#letterText").textContent = "";
  $("#finalLocked").hidden = false; $("#finalContent").hidden = true;
  $("#finalContent").classList.remove("go"); $("#finalMsg").classList.remove("show");
  $("#heartField").innerHTML = "";
  $$(".reveal, .tl-item").forEach(el => el.classList.remove("in"));
  renderQuiz();
  document.body.classList.add("locked");
  $("#main").hidden = true; $("#progress").hidden = true;
  window.scrollTo(0, 0);
  $("#welcome").classList.remove("hide");
});

/* ---------- Heart cursor (desktop) ---------- */
const hc = document.createElement("div");
hc.className = "cursor-heart"; hc.textContent = "♥";
document.body.appendChild(hc);
document.body.classList.add("cursor-on");
addEventListener("mousemove", e => { hc.style.left = e.clientX + "px"; hc.style.top = e.clientY + "px"; });

renderQuiz();
