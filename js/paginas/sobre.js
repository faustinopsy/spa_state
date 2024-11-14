export function paginaSobre (idioma, getTexto){ `
    <div>
        <h1>${getTexto('sobre', 'titulo', idioma)}</h1>
        <p>${getTexto('sobre', 'descricao', idioma)}</p>
        <p>${getTexto('sobre', 'missao', idioma)}</p>
      </div>
    `;
    }