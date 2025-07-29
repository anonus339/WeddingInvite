(function() {
  const URL = 'images/VV.jfif';
  const canvas = document.getElementById('photoCanvas');
  const ctx    = canvas.getContext('2d');
  const img    = new Image();
  img.src      = URL;

  const bubbles = [];
  const MAX     = 20;

  let srcX, srcY, srcW, srcH;

  function computeCover() {
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const cw = canvas.width;
    const ch = canvas.height;
    const ir = iw / ih;
    const cr = cw / ch;

    if (ir > cr) {
      srcH = ih;
      srcW = ih * cr;
      srcX = (iw - srcW) / 2;
      srcY = 0;
    } else {
      srcW = iw;
      srcH = iw / cr;
      srcX = 0;
      srcY = (ih - srcH) / 2;
    }
  }

  function newBubble() {
    const size = 50 + Math.random() * 50;
    bubbles.push({
      x:     Math.random() * canvas.width,
      y:    -size,
      size,
      speed: 0.5 + Math.random() * 1.5
    });
  }

  function resize() {
  const dpr = window.devicePixelRatio || 1;

  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  canvas.width  = displayWidth * dpr;
  canvas.height = displayHeight * dpr;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  computeCover();
}
  window.addEventListener('resize', resize);
  resize();

  function animate() {
    if (bubbles.length < MAX && Math.random() < 0.03) newBubble();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = 'grayscale(100%)';
    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.filter = 'none';
    bubbles.forEach((b, i) => {
      b.y += b.speed;
      if (b.y - b.size > canvas.height) {
        bubbles.splice(i, 1);
        return;
      }
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.restore();

      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth   = 2;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.stroke();
    });

    requestAnimationFrame(animate);
  }

  img.onload = () => {
    computeCover();
    animate();
  };
})();
