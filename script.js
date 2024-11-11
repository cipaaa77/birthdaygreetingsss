function nextPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(`page${pageNumber}`).classList.add('active');
  
    if (pageNumber === 7) {
      startCakeAnimation();
    }
    
    // Ubah background di setiap halaman
    setBackground('images/background.jpg');
  }
  
  function restart() {
    nextPage(1);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    nextPage(1);
  });
  
  function setBackground(imagePath) {
    document.body.style.backgroundImage = `url('${imagePath}')`;  // Menetapkan gambar latar belakang
    document.body.style.backgroundSize = 'cover';                 // Gambar menyesuaikan ukuran layar
    document.body.style.backgroundPosition = 'center';            // Gambar di tengah
    document.body.style.backgroundRepeat = 'no-repeat';           // Gambar tidak diulang
  }
  
  
  // Cake Animation Function remains unchanged
  function startCakeAnimation() {
    const canvas = document.getElementById('cakeCanvas');
    const ctx = canvas.getContext('2d');
  
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  
    let particles = [];
  
    class Particle {
      constructor(x, y, color, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
      }
  
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.96; // shrink effect
      }
  
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  
    function createParticles(x, y) {
      for (let i = 0; i < 20; i++) {
        particles.push(new Particle(
          x, y,
          `hsl(${Math.random() * 360}, 100%, 50%)`,
          Math.random() * 5 + 2,
          Math.random() * 4 - 2,
          Math.random() * 4 - 2
        ));
      }
    }
  
    function drawCake() {
      // Draw the cake
      ctx.fillStyle = '#d2691e'; // cake layer color
      ctx.fillRect(canvas.width / 3, canvas.height / 2, canvas.width / 3, 100);
  
      // Draw candles
      ctx.fillStyle = '#ffd700'; // candle color
      ctx.fillRect(canvas.width / 3 + 20, canvas.height / 2 - 50, 10, 50);
      ctx.fillRect(canvas.width / 2, canvas.height / 2 - 50, 10, 50);
      ctx.fillRect(canvas.width * 2 / 3 - 30, canvas.height / 2 - 50, 10, 50);
  
      // Draw flames
      createFlame(canvas.width / 3 + 25, canvas.height / 2 - 60);
      createFlame(canvas.width / 2 + 5, canvas.height / 2 - 60);
      createFlame(canvas.width * 2 / 3 - 25, canvas.height / 2 - 60);
    }
  
    function createFlame(x, y) {
      ctx.fillStyle = 'orange';
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
  
      createParticles(x, y);
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCake();
  
      particles = particles.filter(p => p.size > 0.5);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
  
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  