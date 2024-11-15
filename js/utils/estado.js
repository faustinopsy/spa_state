const estado = {
    idioma: 'pt',
    rota: 'inicio',
    tamanhoFonte: 16,
    corDeFundo: 'white',
    corDeFonte: 'black'
  };
  
  const observadores = [];
  
  function observar(callback) {
    observadores.push(callback);
  }
  
  function atualizar(novoEstado) {
    Object.assign(estado, novoEstado);
    document.body.style.backgroundColor  = estado.corDeFundo
    document.body.style.color  = estado.corDeFonte
    document.body.style.fontSize = `${estado.tamanhoFonte}px`
    location.hash = estado.rota
    observadores.forEach(callback => callback(estado));
    localStorage.setItem('estadoApp', JSON.stringify(estado));
    
  }
  
  function carregarEstado() {
    const estadoSalvo = JSON.parse(localStorage.getItem('estadoApp'));
    if (estadoSalvo) {
      atualizar(estadoSalvo);
    }
  }

  window.addEventListener('hashchange',()=>{
    const novarota = location.hash
    atualizar({ rota: novarota })
  })
  
  async function carregarTraducoes() {
    let traducoes = {};
    try {
      const resposta = await fetch('./json/translations.json');
      traducoes = await resposta.json();
      return traducoes
    } catch (erro) {
      console.error("Erro ao carregar as traduções:", erro);
    }
  }
  
  carregarEstado();


  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const entryTypeTranslated = traduzirEntrada(entry.entryType);
      console.log(`${entryTypeTranslated} | ${entry.name}: ${entry.duration.toFixed(2)}ms`);
    }
      
      list.getEntries().forEach((entry) => {
            console.log(entry);
      });
  });
  
  observer.observe({
    entryTypes: ['paint', 'mark', 'measure', 'navigation', 'resource', 'longtask']
  });
  
  function traduzirEntrada(entryType) {
    const traducao = {
      'paint': 'Pintura',
      'mark': 'Marca',
      'measure': 'Medição',
      'navigation': 'Navegação',
      'resource': 'Recurso',
      'longtask': 'Tarefa Longa',
      'responseEnd': 'Final da resposta',
      'domComplete': 'Dom Completo'
    };
    return traducao[entryType] || entryType;
  }

  
  export { estado, observar, atualizar, carregarTraducoes };
  