
let escolhas = [];

function digitar(texto, destino, callback) {
  let i = 0;
  const el = document.getElementById(destino);
  el.innerHTML = '';
  const intervalo = setInterval(() => {
    el.innerHTML += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      if (callback) callback();
    }
  }, 40);
}

function escolher(valor, proximaCena) {
  escolhas.push(valor);
  document.querySelectorAll('.scene').forEach(el => el.style.display = 'none');
  document.getElementById(proximaCena).style.display = 'block';
  if (proximaCena === 'sceneAllura') {
    digitar("O Allurim exige clareza. Emoção não funciona aqui. Você pode decidir?", 'typingAllura');
  } else if (proximaCena === 'sceneForjador') {
    digitar("Você aguenta o fardo depois da vitória?", 'typingForjador');
  } else if (proximaCena === 'sceneFinal') {
    finalizar();
  }
}

function finalizar() {
  const contagem = {};
  escolhas.forEach(e => contagem[e] = (contagem[e] || 0) + 1);
  let titulo = '';
  if ((contagem['altruismo'] || 0) + (contagem['coragem'] || 0) + (contagem['companheirismo'] || 0) >= 2) {
    titulo = '✨ Guardião da Chama Antiga';
  } else if ((contagem['ambicao'] || 0) + (contagem['pragmatismo'] || 0) + (contagem['razao'] || 0) >= 2) {
    titulo = '🔥 Portador da Verdade Oculta';
  } else {
    titulo = '🌗 Guardião da Balança Sagrada';
  }
  digitar(`Você é o ${titulo}`, 'finalResultado');
}

const audio = document.getElementById('audioAmbiente');
const toggle = document.getElementById('toggleAudio');
toggle.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    toggle.innerText = '🔊';
  } else {
    audio.pause();
    toggle.innerText = '🔇';
  }
});

window.onload = () => {
  digitar("Você voltou... mas não sabe o que perdeu. Por que retornar às cinzas?", 'typingHaruki');
};
