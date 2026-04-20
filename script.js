// Detectar se é mobile
const isMobile = () => window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouch = () => window.matchMedia("(hover: none) and (pointer: coarse)").matches;

// LOADER
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// CURSOR - Desktop apenas
const cursor = document.querySelector(".cursor");
if (!isTouch()) {
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

// PARTÍCULAS OTIMIZADAS
const particleCount = isMobile() ? 30 : 60;
tsParticles.load("particles-js", {
  fpsLimit: isMobile() ? 30 : 60,
  particles: {
    number: { value: particleCount },
    color: { value: "#00ffff" },
    links: { enable: true, color: "#00ffff" },
    move: { enable: true, speed: isMobile() ? 0.3 : 0.5 }
  }
});

// MENU HAMBURGER
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

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

// LOGO 3D - Desktop apenas
const logo = document.querySelector(".logo-container");
if (logo && !isTouch()) {
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
}

// ============================================
// HOLOGRAMA - DARTH VADER ASSISTENTE
// ============================================
(function() {
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

  function typeMessage() {
    const current = messages[msgIndex];
    const msgEl = document.getElementById('holo-msg-text');
    if (!msgEl) return;

    if (!isDeleting) {
      charIndex++;
      msgEl.innerHTML = current.substring(0, charIndex) + '<span class="holo-cursor"></span>';
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeMessage, 5000);
        return;
      }
      setTimeout(typeMessage, 50);
    } else {
      charIndex--;
      msgEl.innerHTML = current.substring(0, charIndex) + '<span class="holo-cursor"></span>';
      if (charIndex === 0) {
        isDeleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
        setTimeout(typeMessage, 800);
        return;
      }
      setTimeout(typeMessage, 25);
    }
  }

  // Partículas do Holograma
  const pContainer = document.getElementById('holo-particles');
  if (pContainer) {
    const particleNum = isMobile() ? 8 : 14;
    for (let i = 0; i < particleNum; i++) {
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
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      minimized = !minimized;
      widget.classList.toggle('minimized', minimized);
      btn.textContent = minimized ? '+' : '−';
    });
  }

  // Áudio
  function playHologramAudio() {
    const audio = document.getElementById('holo-audio');
    if (audio) {
      if (audio.paused || audio.ended) {
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Erro ao reproduzir áudio:", e));
      }
    }
  }

  const startBtn = document.getElementById('holo-start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playHologramAudio();
    });
  }

  const holoScene = document.getElementById('holo-scene');
  if (holoScene) {
    holoScene.addEventListener('click', (e) => {
      e.stopPropagation();
      playHologramAudio();
    });
  }

  // ============================================
  // RENDERIZAÇÃO 3D (THREE.JS) - OTIMIZADA
  // ============================================
  let scene, camera, renderer, model;
  let resizeTimeout;

  function init3D() {
    console.log("Iniciando renderização 3D...");
    const container = document.getElementById('vader-3d-container');
    if (!container) {
      console.error("Container #vader-3d-container não encontrado!");
      return;
    }

    // Cena
    scene = new THREE.Scene();

    // Câmera
    const fov = 45;
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1 : 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // Luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ffff, 2.0);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);

    // Loader
    const loader = new THREE.GLTFLoader();
    const modelPath = 'vader_model.glb';

    console.log("Tentando carregar modelo:", modelPath);

    loader.load(
      modelPath,
      (gltf) => {
        console.log("Modelo carregado com sucesso!");
        model = gltf.scene;

        // Ajustar escala e posição automaticamente
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.5 / maxDim;
        model.scale.set(scale, scale, scale);
        
        // Centralizar
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;

        // Aplicar material holográfico
        model.traverse((node) => {
          if (node.isMesh) {
            node.material.transparent = true;
            node.material.opacity = 0.9;
            if (node.material.emissive) {
              node.material.emissive = new THREE.Color(0x00ffff);
              node.material.emissiveIntensity = 0.3;
            }
          }
        });

        scene.add(model);
        animate();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% carregado');
      },
      (error) => {
        console.error("Erro ao carregar o modelo:", error);
      }
    );
  }

  function animate() {
    requestAnimationFrame(animate);
    if (model) {
      model.rotation.y += 0.005;
    }
    renderer.render(scene, camera);
  }

  // Redimensionamento responsivo
  function onWindowResize() {
    const container = document.getElementById('vader-3d-container');
    if (!container || !camera || !renderer) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(onWindowResize, 250);
  });

  // Inicializar
  init3D();
  setTimeout(typeMessage, 2000);

})();
