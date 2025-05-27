// 1) Função global que o callback da API chamará:
function initMap() {
  console.log('initMap chamado com config:', window.mapConfig)
  const { center, zoom } = window.mapConfig || {}
  if (!center || typeof zoom !== 'number') {
    console.warn('Configuração de mapa inválida:', window.mapConfig)
    return
  }
  new google.maps.Map(document.getElementById('map'), {
    center,
    zoom
  })
}

// 2) Quando o DOM estiver pronto:
//    - registra clique no botão WhatsApp
//    - atualiza as prévias sociais
document.addEventListener('DOMContentLoaded', () => {
  // WhatsApp
  const btn = document.getElementById('wa-generate')
  if (btn) {
    btn.addEventListener('click', () => {
      const num = document.getElementById('wa-number').value.replace(/\D/g, '')
      const msg = encodeURIComponent(document.getElementById('wa-message').value)
      if (num) window.open(`https://wa.me/${num}?text=${msg}`, '_blank')
      else alert('Digite um número válido!')
    })
  }

  // Social Previews (já renderizadas no template, mas podemos reforçar)
  if (window.socialPreviews) {
    const instaImg = document.querySelector('#instagram-post img')
    const fbImg    = document.querySelector('#facebook-post img')
    if (instaImg && window.socialPreviews.instagram) {
      instaImg.src = window.socialPreviews.instagram
    }
    if (fbImg && window.socialPreviews.facebook) {
      fbImg.src = window.socialPreviews.facebook
    }
  }
})
