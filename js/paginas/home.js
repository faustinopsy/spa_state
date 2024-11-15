import { estado, observar, carregarTraducoes } from '../utils/estado.js';

async function PaginaInicio() {
  const traducoes = await carregarTraducoes();
  const div = document.createElement('div');

  const atualizarConteudo = () => {
    div.innerHTML = `
      <h1>${traducoes.inicio[estado.idioma].titulo}</h1>
      <p>${traducoes.inicio[estado.idioma].descricao}</p>
      <h3>${traducoes.inicio[estado.idioma].subtitulo}</h3>
    `;

    const listaPassos = document.createElement('ul');
    traducoes.inicio[estado.idioma].passos.forEach(passo => {
      const item = document.createElement('li');
      item.textContent = passo;
      listaPassos.appendChild(item);
    });

    div.appendChild(listaPassos);

    const chamadaParaAcao = document.createElement('p');
    chamadaParaAcao.textContent = traducoes.inicio[estado.idioma].chamada_para_acao;
    div.appendChild(chamadaParaAcao);
  };

  observar(atualizarConteudo);
  atualizarConteudo();

  return div;
}

export default PaginaInicio;
