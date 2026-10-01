# Diário de Bordo

Uma aplicação web simples para registrar e gerenciar anotações pessoais (título, data e descrição) diretamente no navegador, sem necessidade de backend. Os dados são persistidos no `localStorage`, então todas as entradas continuam disponíveis mesmo após recarregar a página.

## Sumário

- [Visão geral](#visão-geral)
- [Capturas de tela](#capturas-de-tela)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar](#como-executar)
- [Como funciona](#como-funciona)
- [Modelo de dados](#modelo-de-dados)
- [Estilização](#estilização)
- [Possíveis melhorias](#possíveis-melhorias)
- [Licença](#licença)

## Visão geral

O **Diário de Bordo** é uma SPA (Single Page Application) estática construída com HTML, CSS e JavaScript puro (ESM). O objetivo é oferecer um espaço minimalista para registrar ocorrências do dia a dia, com um formulário de criação e uma lista de cards que podem ser excluídos individualmente.

### Funcionalidades

- Adicionar uma entrada com **título**, **data** e **descrição**.
- Visualizar todas as entradas cadastradas em formato de cards.
- Excluir entradas individualmente.
- Persistência automática no `localStorage` do navegador.
- Interface responsiva com variáveis CSS e ícones do Font Awesome.

## Tecnologias

| Tecnologia         | Uso                                                                 |
| ------------------ | ------------------------------------------------------------------- |
| HTML5              | Estrutura da página e formulário.                                   |
| CSS3               | Estilização, com variáveis customizadas e design responsivo.        |
| JavaScript (ESM)   | Lógica da aplicação, dividida em módulos.                           |
| Font Awesome 6.5   | Ícones dos botões (adicionar e deletar).                            |
| LocalStorage       | Persistência dos dados no navegador.                                |
| Crypto API         | Geração de IDs únicos (`crypto.randomUUID`) para cada entrada.      |

Sem dependências de build: os módulos JS são importados nativamente via `<script type="module">`.

## Estrutura do projeto

```
diario-de-bordo/
├── index.html              # Página principal com o formulário e a lista
├── css/
│   └── style.css           # Estilos (variáveis CSS + layout)
└── js/
    ├── script.js           # Ponto de entrada: orquestra os módulos
    ├── Post.js             # Lida com o envio do formulário (criação)
    └── Render_Cards.js     # Renderiza a lista de cards e a exclusão
```

## Como executar

Por se tratar de uma aplicação estática com **módulos ES**, ela precisa ser servida via HTTP (não funciona com `file://`). Há duas formas simples:

### 1. Servidor local com Python

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador.

### 2. Servidor local com Node.js

```bash
npx serve .
```

Em seguida, abra a URL exibida no terminal.

> Qualquer servidor estático serve. Basta que `index.html` esteja na raiz.

## Como funciona

### Fluxo de inicialização

1. `script.js` importa os módulos `Post` e `Render_Cards`.
2. `Post()` configura o `submit` do formulário.
3. `Render_Cards()` lê o `localStorage` e desenha os cards na seção `.logbook__list`.

### Adicionar uma entrada (`Post.js`)

```js
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const logbook = JSON.parse(localStorage.getItem("logbook")) || []
    logbook.push({
        id: crypto.randomUUID(),
        title: title.value,
        date: date.value.replaceAll("-", "/"),
        description: description.value
    })
    localStorage.setItem("logbook", JSON.stringify(logbook))
    form.reset()
    Render_Cards()
})
```

1. O `submit` é interceptado para evitar o recarregamento da página.
2. O array `logbook` é recuperado do `localStorage` (ou inicializado vazio).
3. Um novo objeto é adicionado com um `id` único gerado por `crypto.randomUUID()`.
4. O array é persistido novamente no `localStorage` em formato JSON.
5. O formulário é limpo e a lista é re-renderizada.

### Renderizar e deletar (`Render_Cards.js`)

- A função `Render_Cards()` monta um card HTML para cada entrada e injeta em `.logbook__list`.
- Cada botão de deletar recebe um listener que:
  1. Localiza o card mais próximo via `e.target.closest(".logbook__card")`.
  2. Filtra o array removendo o item cujo `id` coincide.
  3. Salva o array filtrado no `localStorage`.
  4. Re-renderiza a lista.

> O uso de `closest()` em vez de `parentElement` é o que torna o botão robusto: o clique pode cair no `<i>` (ícone), no texto ou no próprio `<button>`, e a busca continua funcionando.

## Modelo de dados

Os dados ficam em `localStorage` sob a chave **`logbook`** como um array de objetos:

```json
[
  {
    "id": "f1c8b6c2-3a4d-4f0e-9b2e-7c2e9c0e1a15",
    "title": "Reunião de planejamento",
    "date": "2026/10/01",
    "description": "Discussão sobre o roadmap do próximo trimestre."
  }
]
```

| Campo         | Tipo     | Descrição                                  |
| ------------- | -------- | ------------------------------------------ |
| `id`          | `string` | UUID v4 único gerado no momento da criação |
| `title`       | `string` | Título da entrada informado no formulário  |
| `date`        | `string` | Data no formato `YYYY/MM/DD`               |
| `description` | `string` | Texto livre com a descrição da entrada     |

### Resetando os dados

Para limpar todas as entradas, abra o DevTools e rode:

```js
localStorage.removeItem("logbook")
```

## Estilização

O CSS foi organizado usando **custom properties** no `:root`, separando responsabilidades:

```css
:root {
    --color-primary: #4f46e5;
    --color-primary-hover: #4338ca;
    --color-danger: #ef4444;
    --color-danger-hover: #dc2626;
    --color-bg: #f3f4f6;
    --color-bg-card: #ffffff;
    --color-border: #e5e7eb;
    --color-text: #111827;
    --color-text-muted: #6b7280;
    --color-placeholder: #9ca3af;

    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 14px;

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);

    --transition: 0.2s ease;
}
```

- **Cores** ficam fáceis de trocar (tema dark, paleta diferente, etc.) apenas alterando as variáveis.
- **Raio**, **sombras** e **transição** também são tokens reutilizáveis.
- O botão **Adicionar** usa `--color-primary` (índigo) e o **Deletar** usa `--color-danger` (vermelho), ambos com estado de hover/active.
- Cada card tem uma **borda lateral colorida** (`border-left: 4px solid var(--color-primary)`) e ganha uma sombra mais profunda em hover.
- Ícones do Font Awesome ficam centralizados com `display: inline-flex` + `gap` ao lado dos rótulos dos botões.

## Possíveis melhorias

Ideias para evoluções futuras:

- Edição de entradas existentes.
- Confirmação antes de deletar (modal ou `confirm()`).
- Ordenação e filtros (por data, alfabético, busca textual).
- Exportação/importação dos dados (JSON) e backup em arquivo.
- Modo escuro via `@media (prefers-color-scheme: dark)` reaproveitando as variáveis.
- Migração do `localStorage` para `IndexedDB` caso a quantidade de entradas cresça muito.
- Migração para um framework (React, Vue, Svelte) caso a UI fique mais complexa.

## Licença

Projeto pessoal sem licença definida. Adicione uma (`MIT`, por exemplo) se for torná-lo público.
