import Navbar from './components/navbar.js';
import Configuracoes from './utils/configuracoes.js';
import {renderizarPagina} from './roteador.js';
import Header  from './components/header.js';
async function iniciarApp() {
  const app = document.getElementById('app');
  app.innerHTML = ''; 

  const navbar = await Navbar();
  const header = await Header()
  header.appendChild(navbar);
  app.appendChild(header)

  const conteudo = document.createElement('div');
  conteudo.classList.add('main')
  conteudo.id = 'conteudo';
  app.appendChild(conteudo);

  const configuracoes = Configuracoes();
  app.appendChild(configuracoes);

  renderizarPagina();
}

iniciarApp();
