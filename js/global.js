// =========================
// TIEMPO GLOBAL
// =========================
let tiempo = parseInt(localStorage.getItem("tiempo")) || 0;

function actualizarTiempo() {
  const el = document.getElementById("tiempo");
  if (el) el.textContent = tiempo;
}

function ganarTiempo(cantidad) {
  tiempo += cantidad;
  localStorage.setItem("tiempo", tiempo);
  actualizarTiempo();
}

function gastarTiempo(cantidad) {
  if (tiempo >= cantidad) {
    tiempo -= cantidad;
    localStorage.setItem("tiempo", tiempo);
    actualizarTiempo();
    return true;
  }
  return false;
}

window.onload = actualizarTiempo;

// =========================
// EVITAR DOBLE TAP ZOOM
// =========================
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);
