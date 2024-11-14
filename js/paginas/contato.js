export function paginaContato (idioma,getTexto){ `
    <div>
        <h1>${getTexto('contato', 'titulo', idioma)}</h1>
        <p>${getTexto('contato', 'descricao', idioma)}</p>
        <p>${getTexto('contato', 'email', idioma)}</p>
    </div>
    `;
    }