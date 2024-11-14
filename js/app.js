import Navbar from './components/navbar.js';
import Configuracoes from './utils/configuracoes.js';
import { observar } from './utils/estado.js';
import {renderizarPagina} from './roteador.js';

async function iniciarApp() {
  const app = document.getElementById('app');
  app.innerHTML = ''; 

  const navbar = await Navbar();
  app.appendChild(navbar);

  const conteudo = document.createElement('div');
  conteudo.id = 'conteudo';
  app.appendChild(conteudo);

  const configuracoes = Configuracoes();
  app.appendChild(configuracoes);

  observar(renderizarPagina);
  renderizarPagina();
}

iniciarApp();
