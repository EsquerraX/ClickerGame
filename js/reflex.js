let jugando = false;
let inicioTiempo = 0;

function iniciarJuego() {
  if (jugando) return;

  if (!gastarTiempo(5)) {
    document.getElementById("msg").textContent = "⛔ No tienes tiempo suficiente";
    return;
  }

  jugando = true;
  document.getElementById("msg").textContent = "Espera...";
  document.getElementById("area").innerHTML = "";

  const delay = Math.random() * 3000 + 1000;

  setTimeout(() => {
    document.getElementById("msg").textContent = "¡AHORA!";
    const btn = document.createElement("button");
    btn.textContent = "CLICK";
    btn.onclick = reaccionar;
    document.getElementById("area").appendChild(btn);
    inicioTiempo = Date.now();
  }, delay);
}

function reaccionar() {
  const tiempoReaccion = Date.now() - inicioTiempo;
  let ganancia = 0;

  if (tiempoReaccion < 300) ganancia = 20;
  else if (tiempoReaccion < 500) ganancia = 10;
  else if (tiempoReaccion < 800) ganancia = 5;

  ganarTiempo(ganancia);

  document.getElementById("msg").textContent =
    `⏱️ ${tiempoReaccion} ms → +${ganancia} ⏳`;

  document.getElementById("area").innerHTML = "";
  jugando = false;
}
