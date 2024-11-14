import { estado, observar, carregarTraducoes } from '../utils/estado.js';

async function PaginaContato() {
  const traducoes = await carregarTraducoes()

  const div = document.createElement('div');

  const atualizarConteudo = () => {
    div.innerHTML = `
      <h1>${traducoes.contato[estado.idioma].titulo}</h1>
      <p>${traducoes.contato[estado.idioma].descricao}</p>
      <h3>${traducoes.contato[estado.idioma].email}</h3>
    `;
  };

  observar(atualizarConteudo);
  atualizarConteudo();

  return div;
}

export default PaginaContato;
