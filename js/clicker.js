// ===== STATS BASE =====
let poder = parseInt(localStorage.getItem("poder")) || 1;
let flujo = parseInt(localStorage.getItem("flujo")) || 0;
let control = parseFloat(localStorage.getItem("control")) || 1;

let clase = localStorage.getItem("clase") || null;

// COSTOS
let costoClick = parseInt(localStorage.getItem("costoClick")) || 10;
let costoAuto = parseInt(localStorage.getItem("costoAuto")) || 50;
const costoBoost = 100;

// NIVEL
let nivel = parseInt(localStorage.getItem("nivel")) || 1;
let progreso = parseInt(localStorage.getItem("progreso")) || 0;

// BOOST
let boostFin = parseInt(localStorage.getItem("boostFin")) || 0;
let boostInicio = parseInt(localStorage.getItem("boostInicio")) || 0;
let boostActivo = boostFin > Date.now();

// ===== UTILS =====
function requeridoNivel(n){ return 50 + n*25; }
function guardar(){
  localStorage.setItem("poder", poder);
  localStorage.setItem("flujo", flujo);
  localStorage.setItem("control", control);
  localStorage.setItem("clase", clase);
  localStorage.setItem("costoClick", costoClick);
  localStorage.setItem("costoAuto", costoAuto);
  localStorage.setItem("nivel", nivel);
  localStorage.setItem("progreso", progreso);
  localStorage.setItem("boostFin", boostFin);
  localStorage.setItem("boostInicio", boostInicio);
}

// ===== CLASE =====
function aplicarClase(valor){
  if(valor === "poder") poder = Math.ceil(poder * 1.3);
  if(valor === "flujo") flujo = Math.ceil(flujo * 1.5);
  if(valor === "control") control *= 1.5;
}

function elegirClase(valor){
  clase = valor;
  aplicarClase(valor);
  document.getElementById("modalClase").style.display = "none";
  guardar();
  actualizarUI();
}

// ===== CLICK =====
function clickTiempo(){
  let mult = boostActivo ? 2 : 1;
  let bonusClase = clase === "poder" ? 1.3 : 1;
  let ganado = Math.floor(poder * mult * bonusClase);
  ganarTiempo(ganado);
  sumarProgreso(ganado);
}

// ===== PROGRESO =====
function sumarProgreso(c){
  progreso += c;
  let req = requeridoNivel(nivel);
  if(progreso >= req){
    progreso -= req;
    nivel++;
    if(nivel === 3 && !clase){
      document.getElementById("modalClase").style.display = "flex";
    }
  }
  guardar();
  actualizarUI();
}

// ===== MEJORAS =====
function mejorarClick(){
  if(gastarTiempo(costoClick)){
    poder++;
    costoClick = Math.floor(costoClick*1.5);
    guardar(); actualizarUI();
  }
}
function comprarAuto(){
  if(gastarTiempo(costoAuto)){
    flujo++;
    costoAuto = Math.floor(costoAuto*1.7);
    guardar(); actualizarUI();
  }
}

// ===== BOOST =====
function activarBoost(){
  if(boostActivo) return;
  if(gastarTiempo(costoBoost)){
    let extra = clase === "control" ? 1.5 : 1;
    boostActivo = true;
    boostInicio = Date.now();
    boostFin = boostInicio + 20000 * control * extra;
    guardar();
  }
}

// ===== LOOP =====
setInterval(()=>{
  let ahora = Date.now();
  if(boostActivo && ahora > boostFin){
    boostActivo = false; boostFin = 0; boostInicio = 0; guardar();
  }
  if(flujo > 0){
    let mult = boostActivo ? 2 : 1;
    let bonus = clase === "flujo" ? 1.5 : 1;
    ganarTiempo(Math.floor(flujo * mult * bonus));
  }
  actualizarBoostUI();
},1000);

// ===== UI =====
function actualizarUI(){
  document.getElementById("nivel").textContent = nivel;
  document.getElementById("statPoder").textContent = poder;
  document.getElementById("statFlujo").textContent = flujo;
  document.getElementById("statControl").textContent = control.toFixed(1);
  document.getElementById("claseTexto").textContent = clase ?? "Sin elegir";
  document.getElementById("costoClick").textContent = costoClick;
  document.getElementById("costoAuto").textContent = costoAuto;
  let req = requeridoNivel(nivel);
  document.getElementById("barraFill").style.width = Math.min(100,(progreso/req)*100)+"%";
}

function actualizarBoostUI(){
  const cont=document.getElementById("boostContainer");
  if(!boostActivo){ cont.style.display="none"; return; }
  cont.style.display="block";
  const fill=document.getElementById("boostFill");
  const txt=document.getElementById("boostSegundos");
  let total=boostFin-boostInicio;
  let restante=boostFin-Date.now();
  fill.style.width=Math.max(0,(restante/total)*100)+"%";
  txt.textContent=Math.ceil(restante/1000);
}

window.onload = actualizarUI;
