import { estado, observar, carregarTraducoes } from '../utils/estado.js';

async function PaginaInicio() {
  const traducoes = await carregarTraducoes()
  const div = document.createElement('div');
  const atualizarConteudo = () => {
    div.innerHTML = `
      <h1>${traducoes.inicio[estado.idioma].titulo}</h1>
      <p>${traducoes.inicio[estado.idioma].descricao}</p>
      <h3>${traducoes.inicio[estado.idioma].subtitulo}</h3>
    `;
  };

  observar(atualizarConteudo);
  atualizarConteudo();

  return div;
}

export default PaginaInicio;
