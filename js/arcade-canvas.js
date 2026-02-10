const canvases = document.querySelectorAll(".mini-canvas");

canvases.forEach(canvas => {
  const ctx = canvas.getContext("2d");
  const type = canvas.dataset.type;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  let t = 0;
  let fakeTime = 0;
  let angle = 0;
  let flashAlpha = 0;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (type === "clicker") drawClickerPreview();
    if (type === "reflex") drawReflexPreview();
    if (type === "ruleta") drawRuletaPreview();

    t += 0.03;
    requestAnimationFrame(loop);
  }

  /* =====================
     ⏳ CLICKER PREVIEW
     ===================== */
  function drawClickerPreview() {
    fakeTime += 0.25;

    ctx.fillStyle = "#00ffcc";
    ctx.font = "bold 26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      Math.floor(fakeTime) + " ⏳",
      canvas.width / 2,
      canvas.height / 2
    );
  }

  /* =====================
     ⚡ REFLEJOS PREVIEW
     ===================== */
  function drawReflexPreview() {
    if (Math.sin(t * 2.5) > 0.92) flashAlpha = 1;

    if (flashAlpha > 0) {
      ctx.fillStyle = `rgba(0,255,204,${flashAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000";
      ctx.font = "bold 22px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("¡TOCA!", canvas.width / 2, canvas.height / 2);

      flashAlpha -= 0.08;
    } else {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#777";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Espera…", canvas.width / 2, canvas.height / 2);
    }
  }

  /* =====================
     🎰 RULETA PREVIEW (MEJORADA)
     ===================== */
  function drawRuletaPreview() {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = Math.min(cx, cy) - 8;

    angle += 0.02;

    // fondo
    ctx.fillStyle = "#0b0b0b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // segmentos
    const segmentos = [
      "#ff5555",
      "#ffaa00",
      "#00ffcc",
      "#00aaff",
      "#ff55ff"
    ];

    const step = (Math.PI * 2) / segmentos.length;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    for (let i = 0; i < segmentos.length; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.fillStyle = segmentos[i];
      ctx.arc(0, 0, r, i * step, (i + 1) * step);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();

    // borde
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // centro
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();

    // puntero
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(cx, cy - r - 4);
    ctx.lineTo(cx - 6, cy - r + 8);
    ctx.lineTo(cx + 6, cy - r + 8);
    ctx.closePath();
    ctx.fill();
  }

  loop();
});
