import { estado, atualizar, observar } from './estado.js';

function Configuracoes() {
  const div = document.createElement('div');
  div.classList.add('config')
  const aumentaFonte = document.createElement('button');
  aumentaFonte.textContent = 'A +';
  aumentaFonte.addEventListener('click', () => atualizar({ tamanhoFonte: estado.tamanhoFonte + 2 }));
  div.appendChild(aumentaFonte);

  const diminuiFonte = document.createElement('button');
  diminuiFonte.textContent = 'A -';
  diminuiFonte.addEventListener('click', () => atualizar({ tamanhoFonte: estado.tamanhoFonte - 2 }));
  div.appendChild(diminuiFonte);

  const botaoCor = document.createElement('button');
  botaoCor.textContent = 'dark';
  botaoCor.addEventListener('click', () => {
    const novaCor = estado.corDeFundo === 'white' ? 'black' : 'white';
    const fonteCor = novaCor === 'white' ? 'black' : 'white';
    botaoCor.textContent = novaCor === 'white' ? 'dark' : 'light';
    atualizar({ corDeFundo: novaCor });
    atualizar({ corDeFonte: fonteCor });
  });
  div.appendChild(botaoCor);

  const seletorIdioma = document.createElement('select');
  ['pt', 'en'].forEach(idioma => {
    const opcao = document.createElement('option');
    opcao.value = idioma;
    opcao.textContent = idioma === 'pt' ? 'Português' : 'Inglês';
    seletorIdioma.appendChild(opcao);
  });
  seletorIdioma.value = estado.idioma;
  seletorIdioma.addEventListener('change', (event) => atualizar({ idioma: event.target.value }));
  div.appendChild(seletorIdioma);

  observar(() => seletorIdioma.value = estado.idioma);

  return div;
}

export default Configuracoes;
