import { estado, atualizar } from './utils/estado.js';
import PaginaInicio from './paginas/home.js';
import PaginaSobre from './paginas/sobre.js';
import PaginaContato from './paginas/contato.js';

const cachePaginas = {};

function navegarPara(novaRota) {
  atualizar({ rota: novaRota });
  renderizarPagina();
}


async function renderizarPagina() {
  performance.mark('inicio-renderizacao-pagina');
  const conteudo = document.getElementById('conteudo');
  conteudo.innerHTML = '';

  if (!cachePaginas[estado.rota]) {
    const rotas = {
      '#inicio': PaginaInicio,
      '#sobre': PaginaSobre,
      '#contato': PaginaContato,
    };
    
    const PaginaAtual = rotas[estado.rota];
    window.name = estado.rota
    if (PaginaAtual) {
      cachePaginas[estado.rota] = await PaginaAtual();
    } else {
      const paginaNaoEncontrada = document.createElement('div');
      paginaNaoEncontrada.innerHTML = '<h1>Página não encontrada</h1>';
      cachePaginas[estado.rota] = paginaNaoEncontrada;
    }
  }

  conteudo.appendChild(cachePaginas[estado.rota]);
  performance.mark('fim-renderizacao-pagina');
  performance.measure('tempo-renderizacao-pagina', 'inicio-renderizacao-pagina', 'fim-renderizacao-pagina');
}

export { navegarPara, renderizarPagina };
