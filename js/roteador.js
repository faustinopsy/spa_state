import { estado, atualizar } from './utils/estado.js';
import PaginaInicio from './paginas/home.js';
import PaginaSobre from './paginas/sobre.js';
import PaginaContato from './paginas/contato.js';

function navegarPara(novaRota) {
  atualizar({ rota: novaRota });
  renderizarPagina();
}
async function renderizarPagina() {
  const conteudo = document.getElementById('conteudo');
  conteudo.innerHTML = '';

  const rotas = {
    '#inicio': await PaginaInicio(),
    '#sobre': await PaginaSobre(),
    '#contato': await PaginaContato(),
  }

  const paginaAtual = rotas[estado.rota];

  conteudo.appendChild(paginaAtual);
}
export { navegarPara, renderizarPagina };
