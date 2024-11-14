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
  };

  observar(atualizarConteudo);
  atualizarConteudo();

  return div;
}

export default PaginaSobre;
