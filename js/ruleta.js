const ruleta = document.getElementById("circulo");
const resultado = document.getElementById("resultado");
const btn = document.getElementById("btnGirar");

let girando = false;
const costo = 10;

// Premios con peso (probabilidad)
const premios = [
  { texto: "❌ Perdiste", valor: -10, peso: 30, clase: "lose" },
  { texto: "😐 Nada pasa", valor: 0, peso: 25, clase: "neutral" },
  { texto: "🙂 x1", valor: 10, peso: 25, clase: "win" },
  { texto: "😎 x2", valor: 20, peso: 15, clase: "win" },
  { texto: "🔥 JACKPOT x5", valor: 50, peso: 5, clase: "jackpot" }
];

// Elegir premio por peso
function elegirPremio() {
  const total = premios.reduce((s, p) => s + p.peso, 0);
  let r = Math.random() * total;
  for (const p of premios) {
    if ((r -= p.peso) <= 0) return p;
  }
}

// Girar
function girar() {
  if (girando) return;

  if (!gastarTiempo(costo)) {
    resultado.textContent = "❌ No tienes suficiente tiempo";
    return;
  }

  girando = true;
  btn.disabled = true;
  resultado.textContent = "Girando…";
  resultado.className = "resultado";

  const vueltas = 1440 + Math.random() * 1440; // 4–8 vueltas
  ruleta.style.transition = "transform 2.6s cubic-bezier(.15,.8,.2,1)";
  ruleta.style.transform = `rotate(${vueltas}deg)`;

  setTimeout(() => {
    const premio = elegirPremio();

    if (premio.valor > 0) ganarTiempo(premio.valor);

    resultado.textContent = premio.texto;
    resultado.classList.add(premio.clase, "pop");

    girando = false;
    btn.disabled = false;
  }, 2600);
}
