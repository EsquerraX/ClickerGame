const logros = [
  {
    id: "primer_click",
    nombre: "Primer Click",
    desc: "Genera tiempo por primera vez",
    recompensa: 10,
    check: () => true
  },
  {
    id: "auto_1",
    nombre: "Automatización",
    desc: "Compra tu primer Auto Tiempo",
    recompensa: 25,
    check: () => (parseInt(localStorage.getItem("tiempoPorSegundo")) || 0) >= 1
  },
  {
    id: "tiempo_100",
    nombre: "Coleccionista",
    desc: "Alcanza 100 ⏳",
    recompensa: 50,
    check: () => (parseInt(localStorage.getItem("tiempo")) || 0) >= 100
  }
];

let logrosCompletados = JSON.parse(localStorage.getItem("logros")) || [];

function renderLogros() {
  const ul = document.getElementById("listaLogros");
  ul.innerHTML = "";

  logros.forEach(l => {
    const li = document.createElement("li");
    const completado = logrosCompletados.includes(l.id);

    li.innerHTML = `
      <strong>${completado ? "✅" : "⬜"} ${l.nombre}</strong><br>
      <small>${l.desc}</small><br>
      <small>🎁 +${l.recompensa} ⏳</small>
      <br><br>
    `;

    if (!completado && l.check()) {
      ganarTiempo(l.recompensa);
      logrosCompletados.push(l.id);
      localStorage.setItem("logros", JSON.stringify(logrosCompletados));
    }

    ul.appendChild(li);
  });
}

window.onload = renderLogros;
