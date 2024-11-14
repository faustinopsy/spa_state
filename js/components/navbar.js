import { estado, observar } from '../utils/estado.js';
import { navegarPara } from '../roteador.js';

async function Navbar() {
  let traducoes = {};
  
  async function carregarTraducoes() {
    try {
      const resposta = await fetch('./json/translations.json');
      traducoes = await resposta.json();
    } catch (erro) {
      console.error("Erro ao carregar as traduções:", erro);
    }
  }
  await carregarTraducoes()
  const nav = document.createElement('nav');

  const atualizarNavbar = () => {
    nav.innerHTML = '';
    const rotas = ['#inicio', '#sobre', '#contato'];

    rotas.forEach(rota => {
      const botao = document.createElement('button');
      botao.textContent = traducoes['navbar'][estado.idioma][rota];
      botao.addEventListener('click', () => navegarPara(rota));
      nav.appendChild(botao);
    });
  };

  observar(atualizarNavbar);
  atualizarNavbar();

  return nav;
}

export default Navbar;
