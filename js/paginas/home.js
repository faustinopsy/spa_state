let traducoes = {};
export async function paginaHome (idioma){
   await carregarTraducoes();
`
<div>
    <h1>${getTexto('inicio', 'titulo', idioma)}</h1>
    <p>${getTexto('inicio', 'descricao', idioma)}</p>
    <h3>${getTexto('inicio', 'subtitulo', idioma)}</h3>
</div>
`;
}

function getTexto(rota, chave, idioma) {
    return traducoes[rota] && traducoes[rota][idioma] ? traducoes[rota][idioma][chave] : '';
}

async function carregarTraducoes() {
try {
    const resposta = await fetch('./json/translations.json');
    traducoes = await resposta.json();
} catch (erro) {
    console.error("Erro ao carregar as traduções:", erro);
}
}