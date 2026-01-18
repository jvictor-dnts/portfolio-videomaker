/* =========================
   VÍDEOS (CATEGORIAS)
========================= */
const videos = {
  aniversarios: [
    { 
      title: "XV Halycia", 
      file: "PROPOSTA/videos/halycia.mp4", 
      thumb: "PROPOSTA/img/capa_xv.jpeg" // Adicione o caminho da sua imagem aqui
    },
    { 
      title: "90 anos D.Terezinha", 
      file: "PROPOSTA/videos/terezinha.mp4", 
      thumb: "PROPOSTA/img/capa_terezinha.jpeg" 
    },
    { 
      title: "Bodas de Diamante", 
      file: "PROPOSTA/videos/bodas.mp4", 
      thumb: "PROPOSTA/img/capa_bodas.jpeg" 
    }
  ],
  reels: [
    { 
      title: "PLANO FEDERAL - ENEM", 
      file: "PROPOSTA/videos/dirceu.mp4", 
      thumb: "PROPOSTA/img/enem.png" 
    },
    { 
      title: "PLANO FEDERAL - CONCURSO", 
      file: "PROPOSTA/videos/dirceu2.mp4", 
      thumb: "PROPOSTA/img/conc.jpeg"
    },

    { 
      title: "NATAL SOLIDÁRIO - QUEM DIVIDE MULTIPLICA", 
      file: "PROPOSTA/videos/nic.mp4", 
      thumb: "PROPOSTA/img/nic_cp.png"
    },
    { 
      title: "MEDEIROS CONSTRUÇÃO", 
      file: "PROPOSTA/videos/mdrs.mp4", 
      thumb: "PROPOSTA/img/div.png"
    },
    
    ],
  historia: [
    { 
      title: "Minha História - JVictor Videomaker",
      file: "PROPOSTA/videos/hist.mp4", 
      thumb: "PROPOSTA/img/hist.jpeg"
    }
  ],
  institucional: [],
  social: []
};

const gallery = document.getElementById("gallery");
const buttons = document.querySelectorAll(".services-menu button");

function renderGallery(category) {
  gallery.innerHTML = "";
  const categoryVideos = videos[category] || [];

  if (categoryVideos.length === 0) {
    gallery.innerHTML = "<p style='color:#777'>Em breve novos vídeos aqui.</p>";
    return;
  }

  categoryVideos.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    
    
    card.innerHTML = `
      <div class="video-thumb" style="background-image: url('${video.thumb}'); background-size: cover; background-position: center;">
        <div class="play-overlay" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.2); transition:0.3s;">
            <span style="font-size: 30px; color: white;">▶</span>
        </div>
      </div>
      <strong>${video.title}</strong>
    `;
    card.addEventListener("click", () => openModal(video));
    gallery.appendChild(card);
  });
}


buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery(btn.dataset.category);
  });
});

/* =========================
   MODAL DE VÍDEO
========================= */
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const videoTitle = document.getElementById("videoTitle");
const closeBtn = document.querySelector(".close");

function openModal(video) {
  modal.classList.add("active");
  modalVideo.src = video.file;
  videoTitle.textContent = video.title;
  modalVideo.play();
}

function closeModal() {
  modal.classList.remove("active");
  modalVideo.pause();
  modalVideo.src = "";
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

/* =========================
   SCROLL REVEAL E NAV ATIVA
========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function onScroll() {
  let currentSection = "";

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.classList.add("active");
    }

    const sectionTop = sec.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      currentSection = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", onScroll);

/* =========================
   MENSAGEM DE BOAS-VINDAS E INICIALIZAÇÃO
========================= */
document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0); 
  renderGallery("aniversarios"); 
  
  const style = document.createElement("style");
  style.textContent = `
    .welcome-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(5px);
    }
    .welcome-box {
      background: #111;
      color: #fff;
      border: 1px solid #333;
      max-width: 420px;
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    }
    .welcome-box button {
      margin-top: 25px;
      padding: 12px 30px;
      border: none;
      border-radius: 30px;
      background: #fff;
      color: #000;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }
    /* Hover alterado para Cinza como solicitado */
    .welcome-box button:hover { 
        transform: scale(1.05); 
        background: #444; 
        color: #fff; 
    }

    /* Efeito de hover na capa do vídeo */
    .video-card:hover .play-overlay {
        background: rgba(0,0,0,0) !important;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.className = "welcome-overlay";
  overlay.innerHTML = `
    <div class="welcome-box">
      <h3>Seja bem-vindo(a)!</h3>
      <p style="margin-top:15px; color:#ccc; line-height:1.6;">
          Aqui você vai encontrar um pouco do que construo através do audiovisual.<br><br>
        Espero que goste do meu trabalho e que possamos criar algo juntos.
      </p>
      <button id="closeWelcome">Explorar Portfólio</button>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("closeWelcome").addEventListener("click", () => {
    overlay.style.opacity = "0";
    overlay.style.transition = "0.5s";
    setTimeout(() => overlay.remove(), 500);
  });

  onScroll();
});
