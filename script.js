// LOADER
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// CURSOR
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// SOM DE HOVER REMOVIDO

// PARTÍCULAS OTIMIZADAS
tsParticles.load("particles-js", {
  fpsLimit: 60,
  particles: {
    number: { value: 60 },
    color: { value: "#00ffff" },
    links: { enable: true, color: "#00ffff" },
    move: { enable: true, speed: 0.5 }
  }
});

// MENU + SCROLL
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    if (targetId.startsWith("#")) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// MENU ATIVO
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });

  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

// REVEAL
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// LOGO 3D
const logo = document.querySelector(".logo-container");

logo.addEventListener("mousemove", (e) => {
  const rect = logo.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = ((y / rect.height) - 0.5) * 20;
  const rotateY = ((x / rect.width) - 0.5) * -20;

  logo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

logo.addEventListener("mouseleave", () => {
  logo.style.transform = "rotateX(0) rotateY(0)";
});

// ============================================
// HOLOGRAMA - DARTH VADER ASSISTENTE MELHORADO
// ============================================
(function() {
  // Frases de ajuda e auxílio do Darth Vader (20 frases)
  const messages = [
    "Bem-vindo à 03Devs. Sua jornada para o futuro começa aqui.",
    "Sinta o poder da IA. Nossas soluções são inevitáveis.",
    "A tecnologia é seu destino. Não resista.",
    "Você procura conhecimento? Explore nossa plataforma inteligente.",
    "O poder do cloud está ao seu alcance. Submeta-se à inovação.",
    "Clique em Projetos para ver o poder das nossas soluções.",
    "Fale com um especialista. Deixe que eles revelem o futuro.",
    "Sua empresa será transformada. Isso é inevitável.",
    "A IA não é o futuro. A IA é agora.",
    "Sinta o poder da transformação digital.",
    "Você está no caminho certo. Continue explorando.",
    "Nossas soluções são superiores. Você o sabe.",
    "O conhecimento é poder. Adquira-o conosco.",
    "Não há escape. A inovação é seu destino.",
    "Bem-vindo ao lado escuro da tecnologia.",
    "Você sente isso? É o poder do futuro.",
    "Nossas plataformas controlam o destino.",
    "Junte-se a nós. Juntos, seremos invencíveis.",
    "A transformação é inevitável. Aceite-a."
  ];

  let msgIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isCurrentlySpeaking = false;

  // Função para reproduzir o áudio .mp3 do Darth Vader
  function playHologramAudio() {
    const audio = document.getElementById('holo-audio');
    if (audio) {
      // Só reinicia se o áudio já tiver terminado ou não estiver tocando
      if (audio.paused || audio.ended) {
        audio.currentTime = 0;
        isCurrentlySpeaking = true;
        audio.play().catch(e => console.error("Erro ao reproduzir áudio:", e));
        
        audio.onended = () => {
          isCurrentlySpeaking = false;
        };
      }
    }
  }

  function typeMessage() {
    const current = messages[msgIndex];
    
    const msgEl = document.getElementById('holo-msg-text');
    if (!msgEl) return;

    if (!isDeleting) {
      charIndex++;
      msgEl.innerHTML = current.substring(0, charIndex) + '<span class="holo-cursor"></span>';
      
      if (charIndex === current.length) {
        isDeleting = true;
        // Pausa maior para permitir que a fala termine
        setTimeout(typeMessage, 5000);
        return;
      }
      setTimeout(typeMessage, 50);
    } else {
      charIndex--;
      msgEl.innerHTML = current.substring(0, charIndex) + '<span class="holo-cursor"></span>';
      
      if (charIndex === 0) {
        isDeleting = false;
        msgIndex = (msgIndex + 1) % messages.length; // Garante ciclo contínuo
        setTimeout(typeMessage, 800); // Pausa entre frases
        return;
      }
      setTimeout(typeMessage, 25);
    }
  }

  // Partículas do Holograma
  const pContainer = document.getElementById('holo-particles');
  if (pContainer) {
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('div');
      p.className = 'holo-particle';
      const x = Math.random() * 140 + 10;
      const drift = (Math.random() - 0.5) * 40;
      const size = 1 + Math.random() * 2.5;
      p.style.cssText = `left:${x}px; bottom:20px; --pdrift:${drift}px; width:${size}px; height:${size}px; animation-duration:${2 + Math.random() * 3}s; animation-delay:${Math.random() * 4}s;`;
      pContainer.appendChild(p);
    }
  }

  // Botão minimizar/expandir
  const widget = document.getElementById('holo-widget');
  const btn = document.getElementById('holo-toggle');
  let minimized = false;

  if (btn && widget) {
    btn.addEventListener('click', () => {
      minimized = !minimized;
      widget.classList.toggle('minimized', minimized);
      btn.textContent = minimized ? '+' : '−';
      if (minimized) {
        const audio = document.getElementById('holo-audio');
        if (audio) audio.pause();
        isCurrentlySpeaking = false;
      }
    });
  }

  // Iniciar digitação após um pequeno delay
  setTimeout(typeMessage, 2000);

  // Botão Iniciar Interação
  const startBtn = document.getElementById('holo-start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playHologramAudio();
    });
  }

  // Clique manual no holograma
  const holoScene = document.getElementById('holo-scene');
  if (holoScene) {
    holoScene.style.cursor = 'pointer';
    holoScene.addEventListener('click', (e) => {
      e.stopPropagation();
      playHologramAudio();
    });
  }

  // Log para debug (remover em produção se necessário)
  console.log('Darth Vader Assistente inicializado com', messages.length, 'frases');

})();
