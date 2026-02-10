// =========================
// DATOS BASE
// =========================
let tiempoPorClick = parseInt(localStorage.getItem("tiempoPorClick")) || 1;
let tiempoPorSegundo = parseInt(localStorage.getItem("tiempoPorSegundo")) || 0;

let costoClick = parseInt(localStorage.getItem("costoClick")) || 10;
let costoAuto = parseInt(localStorage.getItem("costoAuto")) || 50;

// NIVELES
let nivel = parseInt(localStorage.getItem("nivel")) || 1;
let progreso = parseInt(localStorage.getItem("progreso")) || 0;

// BOOST NORMAL
let boostFin = parseInt(localStorage.getItem("boostFin")) || 0;
let boostInicio = parseInt(localStorage.getItem("boostInicio")) || 0;
let boostActivo = boostFin > Date.now();

// BOOST GRATIS (CONTROL)
let boostGratisUsado = localStorage.getItem("boostGratisUsado") === "true";

// =========================
// UTILIDADES
// =========================
function requeridoNivel(n) {
  return 50 + n * 25;
}

function guardar() {
  localStorage.setItem("tiempoPorClick", tiempoPorClick);
  localStorage.setItem("tiempoPorSegundo", tiempoPorSegundo);
  localStorage.setItem("costoClick", costoClick);
  localStorage.setItem("costoAuto", costoAuto);
  localStorage.setItem("nivel", nivel);
  localStorage.setItem("progreso", progreso);
  localStorage.setItem("boostFin", boostFin);
  localStorage.setItem("boostInicio", boostInicio);
  localStorage.setItem("boostGratisUsado", boostGratisUsado);
}

// =========================
// PROGRESO
// =========================
function sumarProgreso(cantidad) {
  progreso += cantidad;
  const req = requeridoNivel(nivel);

  if (progreso >= req) {
    progreso -= req;
    nivel++;
  }

  guardar();
  actualizarUI();
}

// =========================
// CLICK
// =========================
function clickTiempo() {
  const mult = boostActivo ? 2 : 1;
  const g = tiempoPorClick * mult;

  ganarTiempo(g);
  sumarProgreso(g);

  const box = document.getElementById("tiempoBox");
  box.classList.add("glow");
  setTimeout(() => box.classList.remove("glow"), 200);
}

// =========================
// MEJORAS
// =========================
function mejorarClick() {
  if (gastarTiempo(costoClick)) {
    tiempoPorClick++;
    costoClick = Math.floor(costoClick * 1.5);
    guardar();
    actualizarUI();
  }
}

function comprarAuto() {
  if (gastarTiempo(costoAuto)) {
    tiempoPorSegundo++;
    costoAuto = Math.floor(costoAuto * 1.7);
    guardar();
    actualizarUI();
  }
}

// =========================
// BOOST NORMAL
// =========================
function activarBoost() {
  if (boostActivo) return;
  if (gastarTiempo(100)) {
    boostActivo = true;
    boostInicio = Date.now();
    boostFin = boostInicio + 30000;
    guardar();
  }
}

// =========================
// BOOST GRATIS (1 VEZ + NUEVA PESTAÑA)
// =========================
function boostGratis() {
  if (boostGratisUsado) return;

  boostGratisUsado = true;

  boostActivo = true;
  boostInicio = Date.now();
  boostFin = boostInicio + 20000; // 20s
  guardar();

  // 🔗 ABRIR EN OTRA PESTAÑA
  window.open(
    "https://tiyeicaps.github.io/Tj/catalogo.html",
    "_blank"
  );

  actualizarUI();
}

// =========================
// LOOP
// =========================
setInterval(() => {
  const ahora = Date.now();

  if (boostActivo && ahora > boostFin) {
    boostActivo = false;
    boostFin = 0;
    boostInicio = 0;
    guardar();
  }

  if (tiempoPorSegundo > 0) {
    const mult = boostActivo ? 2 : 1;
    const g = tiempoPorSegundo * mult;
    ganarTiempo(g);
    sumarProgreso(g);
  }

  actualizarBoostUI();
}, 1000);

// =========================
// UI
// =========================
function actualizarUI() {
  document.getElementById("costoClick").textContent = costoClick;
  document.getElementById("costoAuto").textContent = costoAuto;
  document.getElementById("nivel").textContent = nivel;

  const req = requeridoNivel(nivel);
  const pct = Math.min(100, (progreso / req) * 100);
  document.getElementById("barraFill").style.width = pct + "%";

  const btn = document.getElementById("btnBoostGratis");
  if (boostGratisUsado) {
    btn.textContent = "🎁 Boost Gratis (usado)";
    btn.disabled = true;
    btn.style.opacity = 0.5;
  }
}

function actualizarBoostUI() {
  const cont = document.getElementById("boostContainer");
  const fill = document.getElementById("boostFill");
  const txt = document.getElementById("boostSegundos");

  if (!boostActivo) {
    cont.style.display = "none";
    return;
  }

  cont.style.display = "block";

  const total = boostFin - boostInicio;
  const restante = boostFin - Date.now();
  const pct = Math.max(0, (restante / total) * 100);

  fill.style.width = pct + "%";
  txt.textContent = Math.ceil(restante / 1000);
}

window.onload = actualizarUI;
