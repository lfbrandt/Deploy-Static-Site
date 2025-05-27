// 1) Função global para inicializar o mapa Leaflet
function initMap() {
  console.log('initMap chamado com config:', window.mapConfig);
  const { center, zoom } = window.mapConfig || {};
  // Confere se center é um array [lat, lng]
  if (!Array.isArray(center) || typeof zoom !== 'number') {
    console.warn('Configuração de mapa inválida:', window.mapConfig);
    return;
  }
  // Remove mapa anterior se já existir (útil em reload)
  if (window._leafletMap) window._leafletMap.remove();
  // Inicializa Leaflet
  window._leafletMap = L.map('map').setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(window._leafletMap);
}

// 2) Quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // WhatsApp
  const btn = document.getElementById('wa-generate');
  if (btn) {
    btn.addEventListener('click', () => {
      const num = document.getElementById('wa-number').value.replace(/\D/g, '');
      const msg = encodeURIComponent(document.getElementById('wa-message').value);
      if (num) window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
      else alert('Digite um número válido!');
    });
  }

  // Social Previews (reforça imagens)
  if (window.socialPreviews) {
    const instaImg = document.querySelector('#instagram-post img');
    const fbImg    = document.querySelector('#facebook-post img');
    if (instaImg && window.socialPreviews.instagram) {
      instaImg.src = window.socialPreviews.instagram;
    }
    if (fbImg && window.socialPreviews.facebook) {
      fbImg.src = window.socialPreviews.facebook;
    }
  }

  // Inicializa o mapa Leaflet
  initMap();
});