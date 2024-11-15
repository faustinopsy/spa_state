import { estado, observar, carregarTraducoes } from '../utils/estado.js';
import { navegarPara } from '../roteador.js';

async function Navbar() {

  const traducoes = await carregarTraducoes()
  const nav = document.createElement('nav');

  const atualizarNavbar = () => {
    nav.innerHTML = '';
    const rotas = ['#inicio', '#sobre', '#contato'];

    rotas.forEach(rota => {
      const botao = document.createElement('a');
      botao.textContent = traducoes['navbar'][estado.idioma][rota] ;
      botao.addEventListener('click', () => navegarPara(rota));
      nav.appendChild(botao);
    });
  };

  observar(atualizarNavbar);
  atualizarNavbar();

  return nav;
}

export default Navbar;
