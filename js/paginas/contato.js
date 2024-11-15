import { estado, observar, carregarTraducoes } from '../utils/estado.js';

async function PaginaContato() {
  const traducoes = await carregarTraducoes()

  const div = document.createElement('div');

  const atualizarConteudo = () => {
    div.innerHTML = `
      <h1>${traducoes.contato[estado.idioma].titulo}</h1>
      <p>${traducoes.contato[estado.idioma].descricao}</p>
      <p>${traducoes.contato[estado.idioma].email}</p>
      <p>${traducoes.contato[estado.idioma].telefone}</p>
      <p>${traducoes.contato[estado.idioma].endereco}</p>
    `;
  };

  observar(atualizarConteudo);
  atualizarConteudo();

  return div;
}

export default PaginaContato;
