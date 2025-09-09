const CONFIG = {
  name: "UpTI Studio",
  role: "Soluções em Tecnologia",
  bio: "Transforme seguidores em clientes com ofertas diretas e CTA certeiro.",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
  whatsapp: "+5511999999999", // número em formato internacional sem espaços
  defaultUrl: "https://seudominio.vercel.app",
  gaId: "", // placeholder para Google Analytics / GTM
};


document.getElementById("name").textContent = CONFIG.name;
document.getElementById("role").textContent = CONFIG.role;
document.getElementById("bio").textContent = CONFIG.bio;
document.getElementById("profileImg").src = CONFIG.avatar;

// whatsapp link com mensagem pronta
const wa = CONFIG.whatsapp.replace(/\D/g, "");
const waLink = `https://wa.me/${wa}?text=${encodeURIComponent(
  "Olá! Vi seu link na bio e quero saber mais sobre a oferta."
)}`;
const wBtn = document.getElementById("whatsappBtn");
wBtn.href = waLink;

// botão comprar: redireciona para checkout (pode ser PagSeguro, Gerencianet, PayPal)
document.getElementById("buyBtn").addEventListener("click", () => {
  // exemplo: abrir link de oferta com utm
  const url =
    CONFIG.defaultUrl +
    "/oferta?utm_source=bio&utm_medium=link&utm_campaign=sale";
  window.open(url, "_blank");
});

// abrir links dos itens
function openLink(e) {
  const el = e.currentTarget || e.target.closest(".link-item");
  const href = el.dataset.href;
  if (href.startsWith("#")) return;
  try {
    const url = new URL(href);
    url.searchParams.set("utm_source", "bio");
    url.searchParams.set("utm_medium", "link");
    window.open(url.toString(), "_blank");
  } catch (err) {
    window.open(href, "_blank");
  }
}


function openForm(e) {
  document.getElementById("modal").style.display = "flex";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

document
  .getElementById("leadForm")
  .addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const data = new FormData(this);
    // Exemplo: enviar para um endpoint Formspree / Netlify / Vercel Serverless
    // Substitua ACTION_URL pelo seu endpoint de formularios
    const ACTION_URL = "https://formspree.io/f/your-id";
    try {
      await fetch(ACTION_URL, { method: "POST", body: data });
      alert("Obrigado! O cupom será enviado em breve.");
      closeModal();
    } catch (err) {
      alert(
        "Erro no envio — salve os dados manualmente enquanto configura o endpoint."
      );
    }
  });


document.getElementById("copyBtn").addEventListener("click", async () => {
  const link = CONFIG.defaultUrl;
  try {
    await navigator.clipboard.writeText(link);
    alert("Link copiado! Cole na bio do Instagram.");
  } catch (e) {
    prompt("Copie o link:", link);
  }
});

document.getElementById("shareBtn").addEventListener("click", () => {
  const link = CONFIG.defaultUrl;
  if (navigator.share) {
    navigator
      .share({ title: CONFIG.name, text: "Confira:", url: link })
      .catch(() => {
        window.open(link);
      });
  } else window.open("https://wa.me/?text=" + encodeURIComponent(link));
});


// countdown simples (exemplo: 30 minutos)
const countdownEl = document.getElementById("countdown");
const timerEl = document.getElementById("timer");
let countdownTime = 30 * 60; // 30 minutos em segundos
const interval = setInterval(() => {
  if (countdownTime <= 0) {
    clearInterval(interval);
    countdownEl.style.display = "none";
    return;
  }
  countdownTime--;
  const hrs = String(Math.floor(countdownTime / 3600)).padStart(2, "0");
  const mins = String(Math.floor((countdownTime % 3600) / 60)).padStart(2, "0");
  const secs = String(countdownTime % 60).padStart(2, "0");
  timerEl.textContent = `${hrs}:${mins}:${secs}`;
}, 1000);



function openModalOferta() {
  document.getElementById("modalOferta").style.display = "flex";
}
function closeModalOferta() {
  document.getElementById("modalOferta").style.display = "none";
}
document.getElementById("confirmBuyBtn").addEventListener("click", () => {
  const url =
    CONFIG.defaultUrl +
    "/oferta?utm_source=bio&utm_medium=modal&utm_campaign=sale";
  window.open(url, "_blank");
});


document.getElementById("buyBtn").addEventListener("click", openModalOferta);


if (CONFIG.gaId) {
  // carregar GA / GTM dinamicamente — implemente conforme sua escolha
  console.log("GA ativo: ", CONFIG.gaId);
}


