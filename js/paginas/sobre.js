import { estado, observar, carregarTraducoes } from '../utils/estado.js';

async function PaginaSobre() {
  const traducoes = await carregarTraducoes()
  const div = document.createElement('div');

  const atualizarConteudo = () => {
    div.innerHTML = `
      <h1>${traducoes.sobre[estado.idioma].titulo}</h1>
      <p>${traducoes.sobre[estado.idioma].descricao}</p>
      <h3>${traducoes.sobre[estado.idioma].missao}</h3>
    `;
  

  const listaValores = document.createElement('ul');
    traducoes.sobre[estado.idioma].valores.forEach(valor => {
      const item = document.createElement('li');
      item.textContent = valor;
      listaValores.appendChild(item);
    });

    div.appendChild(listaValores);
  };
  
  observar(atualizarConteudo);
  atualizarConteudo();

  return div;
}

export default PaginaSobre;
