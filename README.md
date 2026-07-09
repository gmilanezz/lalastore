# Lala Store VIP - Angular

Migração inicial do projeto HTML/CSS/JS puro para **Angular**.

O objetivo desta versão é transformar o catálogo em uma aplicação mais preparada para crescimento:

- produtos como dados, não como HTML fixo;
- componentes reutilizáveis;
- rotas para home, catálogo, produto, carrinho e admin;
- mock centralizado em TypeScript;
- admin fake com `localStorage` para simular cadastro, edição, exclusão e importação de catálogo;
- carrinho usando `localStorage`.

## Como rodar

```bash
npm install
npm start
```

Depois acesse:

```txt
http://localhost:4200
```

## Rotas principais

```txt
/                               Home
/catalogo/esmeralda/catalogo1   Catálogo por marca/catálogo
/produto/1                      Detalhe do produto
/carrinho                       Sacola
/admin                          Painel administrativo fake
```

## Estrutura principal

```txt
src/app
├── components
│   ├── header
│   ├── footer
│   ├── whatsapp-button
│   └── product-card
├── pages
│   ├── home
│   ├── catalog
│   ├── product-detail
│   ├── cart
│   └── admin
├── services
│   ├── product.service.ts
│   └── cart.service.ts
├── models
│   ├── product.model.ts
│   └── cart.model.ts
└── mocks
    └── products.mock.ts
```

## Como o catálogo ficou automatizado no mock

Hoje os produtos vêm de:

```txt
src/app/mocks/products.mock.ts
```

O `ProductService` carrega esses dados e permite que as páginas consumam produtos sem escrever cards manualmente no HTML.

A tela `/admin` salva alterações no `localStorage`. Isso simula o fluxo real de administrador, mas ainda não é produção.

## Caminho para produção

Quando quiser trocar mock por dados reais, a camada correta para alterar é:

```txt
src/app/services/product.service.ts
```

Hoje:

```ts
this.productsSubject = new BehaviorSubject<Product[]>(this.loadInitialProducts());
```

Futuro:

```ts
this.http.get<Product[]>('https://sua-api.com/products')
```

Opções boas para a próxima etapa:

- Supabase;
- Firebase;
- Strapi;
- API própria com Node.js;
- WordPress como CMS headless.

## Observação importante

Este projeto ainda não possui autenticação real. A rota `/admin` é apenas uma simulação. Para produção, crie autenticação e autorização por perfil, por exemplo:

```txt
customer: compra e vê produtos
admin: cadastra, edita, remove e importa produtos
```
