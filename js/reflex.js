let esperando = false;
let tiempoInicio = 0;
let timeoutID = null;

const area = document.getElementById("area");
const msg = document.getElementById("msg");

// =========================
// INICIAR JUEGO
// =========================
function iniciarJuego() {
  if (esperando) return;

  msg.textContent = "Prepárate…";
  area.textContent = "";
  area.style.background = "#111";

  const espera = Math.random() * 2000 + 1000;

  timeoutID = setTimeout(() => {
    esperando = true;
    tiempoInicio = Date.now();
    area.style.background = "#00ffcc";
    area.textContent = "¡TOCA!";
  }, espera);
}

// =========================
// CLICK / TOUCH
// =========================
area.addEventListener("click", reaccion);
area.addEventListener("touchstart", reaccion, { passive: true });

function reaccion() {
  if (!esperando) {
    msg.textContent = "❌ Muy pronto…";
    clearTimeout(timeoutID);
    resetear();
    return;
  }

  const tiempoReaccion = Date.now() - tiempoInicio;
  msg.textContent = `⚡ ${tiempoReaccion} ms`;

  // recompensa
  const recompensa = Math.max(1, Math.floor(300 / tiempoReaccion));
  ganarTiempo(recompensa);

  resetear();
}

// =========================
// RESET
// =========================
function resetear() {
  esperando = false;
  area.style.background = "#111";
  area.textContent = "Esperando…";
}
