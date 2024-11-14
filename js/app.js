const estado = {
  estadoInicial:{
    idioma: 'pt',
    rota: 'inicio',
    tamanhoFonte: 16,
    corDeFundo: 'branco'
  }
    
  };
  
  let traducoes = {};
  
  async function carregarTraducoes() {
    try {
      const resposta = await fetch('./json/translations.json');
      traducoes = await resposta.json();
    } catch (erro) {
      console.error("Erro ao carregar as traduções:", erro);
    }
  }


  function getTexto(rota, chave, idioma) {
    return traducoes[rota] && traducoes[rota][idioma] ? traducoes[rota][idioma][chave] : '';
  }
  
  
  function carregarEstado() {
    const estadoSalvo = localStorage.getItem('estadoApp');
    return estadoSalvo ? JSON.parse(estadoSalvo) : { ...estadoestadoInicial };
  }
  
  function salvarEstado(estado) {
    localStorage.setItem('estadoApp', JSON.stringify(estado));
  }
  

  function aplicarEstilo(estado) {
    document.getElementById('app').style.fontSize = `${estado.tamanhoFonte}px`;
    document.body.style.backgroundColor = estado.corDeFundo === 'branco' ? 'white' : 'black';
    document.body.style.color = document.body.style.backgroundColor==='black' ? 'white' : 'black';
  }
  

  const templates = {
    inicio: (idioma) => `
      <div>
        <h1>${getTexto('inicio', 'titulo', idioma)}</h1>
        <p>${getTexto('inicio', 'descricao', idioma)}</p>
        <h3>${getTexto('inicio', 'subtitulo', idioma)}</h3>
      </div>
    `,
    sobre: (idioma) => `
      <div>
        <h1>${getTexto('sobre', 'titulo', idioma)}</h1>
        <p>${getTexto('sobre', 'descricao', idioma)}</p>
        <p>${getTexto('sobre', 'missao', idioma)}</p>
      </div>
    `,
    contato: (idioma) => `
      <div>
        <h1>${getTexto('contato', 'titulo', idioma)}</h1>
        <p>${getTexto('contato', 'descricao', idioma)}</p>
        <p>${getTexto('contato', 'email', idioma)}</p>
      </div>
    `
  };
  
  function renderizarApp() {
    const app = document.getElementById('app');
    app.innerHTML = '';
  
    const navbar = ['inicio', 'sobre', 'contato']
    const nav = document.createElement('nav');
    navbar.forEach((rota, idioma) => {
      const texto = getTexto('navbar',rota, idioma)
      console.log(texto)
      const botao = document.createElement('button');
      botao.textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
      botao.addEventListener('click', () => atualizarRota(rota));
      nav.appendChild(botao);
    });
    app.appendChild(nav);
  
    const conteudo = document.createElement('div');
    conteudo.id = 'conteudo';
    conteudo.innerHTML = templates[estadoAtual.rota](estadoAtual.idioma);
    app.appendChild(conteudo);
  
    const configuracoes = document.createElement('div');
    const seletorIdioma = document.createElement('select');
    ['pt', 'en'].forEach(idioma => {
      const opcao = document.createElement('option');
      opcao.value = idioma;
      opcao.textContent = idioma === 'pt' ? 'Português' : 'Inglês';
      seletorIdioma.appendChild(opcao);
    });
    seletorIdioma.value = estadoAtual.idioma;
    seletorIdioma.addEventListener('change', (event) => atualizarEstado({ idioma: event.target.value }));
    configuracoes.appendChild(seletorIdioma);
  
    const fonteMenor = document.createElement('button');
    fonteMenor.textContent = 'A -';
    fonteMenor.addEventListener('click', () => atualizarEstado({ tamanhoFonte: estadoAtual.tamanhoFonte - 2 }));
    configuracoes.appendChild(fonteMenor);

    const fontMaior = document.createElement('button');
    fontMaior.textContent = 'A +';
    fontMaior.addEventListener('click', () => atualizarEstado({ tamanhoFonte: estadoAtual.tamanhoFonte + 2 }));
    configuracoes.appendChild(fontMaior);
    
    const botaoCor = document.createElement('button');
    botaoCor.textContent = 'Mudar Cor de Fundo';
    botaoCor.addEventListener('click', () => {
      const novaCor = estadoAtual.corDeFundo === 'branco' ? 'cinza' : 'branco';
      atualizarEstado({ corDeFundo: novaCor });
    });
    configuracoes.appendChild(botaoCor);
  
    app.appendChild(configuracoes);
  }
  
  function atualizarEstado(novoEstado) {
    estadoAtual = { ...estadoAtual, ...novoEstado };
    aplicarEstilo(estadoAtual);
    salvarEstado(estadoAtual);
    renderizarApp();
  }
  
  function atualizarRota(novaRota) {
    atualizarEstado({ rota: novaRota });
  }
  
  let estadoAtual = carregarEstado();
  carregarTraducoes().then(() => {
    aplicarEstilo(estadoAtual);
    renderizarApp();
  });
  