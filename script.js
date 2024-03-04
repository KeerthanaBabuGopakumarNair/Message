const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

yesBtn.addEventListener("click", () => {
  question.innerHTML = "Yayyyy, see you tomorrow!";
  gif.src =
    "https://media.giphy.com/media/yNfIpRlSVjXpW9Nx4i/giphy.gif?cid=790b7611c32m5mgum1w3l7zie29u44ta4pz6j6m0c7an8yu2&ep=v1_gifs_search&rid=giphy.gif&ct=g";
  launchFireworks(); // Trigger the fireworks when "Yes" is clicked
});

noBtn.addEventListener("mouseover", () => {
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - noBtnRect.width;
  const maxY = window.innerHeight - noBtnRect.height;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
});

// Rest of your existing JS code...

// Fireworks code
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const fireworks = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createFirework() {
    const firework = {
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        particles: [],
    };

    for (let i = 0; i < 100; i++) {
        const particle = {
            x: firework.x,
            y: firework.y,
            size: Math.random() * 2 + 1,
            speed: (Math.random() * 2) + 1,
            angle: Math.random() * 360,
            color: firework.color,
        };
        firework.particles.push(particle);
    }

    fireworks.push(firework);
}

function drawFirework(firework) {
    ctx.beginPath();
    ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
    ctx.fillStyle = firework.color;
    ctx.fill();
}

function drawParticle(particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
}

function updateFirework(firework) {
    firework.y -= firework.speed;

    firework.particles.forEach(particle => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.size -= 0.02;
    });

    firework.particles = firework.particles.filter(particle => particle.size > 0);

    if (firework.size <= 0.2) {
        fireworks.splice(fireworks.indexOf(firework), 1);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach(firework => {
        drawFirework(firework);
        updateFirework(firework);
    });

    requestAnimationFrame(animate);
}

function launchFireworks() {
    for (let i = 0; i < 5; i++) {
        createFirework();
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
