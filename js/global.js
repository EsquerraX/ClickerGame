let tiempo = 0;
let ultimoGuardado = Date.now();

function cargarTiempo() {
  tiempo = parseInt(localStorage.getItem("tiempo")) || 0;
  ultimoGuardado = parseInt(localStorage.getItem("ultimoGuardado")) || Date.now();

  // PROGRESO OFFLINE
  const ahora = Date.now();
  const segundosFuera = Math.floor((ahora - ultimoGuardado) / 1000);
  const tps = parseInt(localStorage.getItem("tiempoPorSegundo")) || 0;

  if (segundosFuera > 0 && tps > 0) {
    tiempo += segundosFuera * tps;
  }

  guardarTiempo();
  actualizarTiempo();
}

function guardarTiempo() {
  localStorage.setItem("tiempo", tiempo);
  localStorage.setItem("ultimoGuardado", Date.now());
}

function ganarTiempo(cantidad) {
  tiempo += cantidad;
  guardarTiempo();
  actualizarTiempo();
}

function gastarTiempo(cantidad) {
  if (tiempo >= cantidad) {
    tiempo -= cantidad;
    guardarTiempo();
    actualizarTiempo();
    return true;
  }
  return false;
}

function actualizarTiempo() {
  const el = document.getElementById("tiempo");
  if (el) el.textContent = tiempo;
}

window.onload = cargarTiempo;
