# Guia Detalhado: Como Adicionar Fontes Locais (Satoshi) ao seu Projeto Next.js

Este guia é um passo a passo completo para pegar numa pasta de fontes que baixaste (como a `Satoshi_Complete` que enviaste) e fazê-la funcionar corretamente no teu projeto Next.js.

Este método chama-se "self-hosting" (auto-hospedagem) e é o método com melhor performance, pois não depende de servidores externos como o Google Fonts.

---

### Passo 1: Copiar os Arquivos da Fonte para a Pasta `public`

O Next.js serve arquivos estáticos (como imagens, vídeos e fontes) a partir de uma pasta especial chamada `public`. Temos de colocar os nossos arquivos de fonte lá.

1.  **Encontra a pasta `public`:** Na raiz do teu projeto, tens a pasta `public`.
2.  **Cria uma subpasta:** Dentro de `public`, cria uma nova pasta chamada `fonts`.
    * A estrutura será: `public/fonts/`
3.  **Localiza as tuas fontes:** No arquivo que baixaste (`Satoshi_Complete`), navega até encontrares os arquivos de fonte para a web. O caminho é:
    * `Satoshi_Complete/Fonts/WEB/fonts/`
4.  **Copia os arquivos `.woff2`:** Dentro dessa pasta, vais encontrar muitos arquivos. Os mais importantes e modernos são os **`.woff2`**. Copia os que vais usar para a tua pasta `public/fonts/`.

    Para este projeto, vamos usar 4 pesos:
    * `Satoshi-Regular.woff2` (para texto normal)
    * `Satoshi-Medium.woff2` (para texto com algum destaque)
    * `Satoshi-Bold.woff2` (para títulos)
    * `Satoshi-Black.woff2` (para títulos muito grandes)

    **Ao final, a tua pasta `public/fonts` deve ficar assim:**

    ```
    Projeto/
    └── public/
        └── fonts/
            ├── Satoshi-Black.woff2
            ├── Satoshi-Bold.woff2
            ├── Satoshi-Medium.woff2
            └── Satoshi-Regular.woff2
    ```

---

### Passo 2: Limpar as Fontes Antigas (Google Fonts)

Antes de adicionar a nova fonte, temos de remover as fontes antigas (`Playfair_Display` e `Manrope`) que estávamos a importar do Google.

1.  **Abre o arquivo:** `src/app/layout.tsx`
2.  **Apaga** as linhas de importação das fontes no topo do arquivo.

    ```tsx
    // APAGUE ESTAS LINHAS:
    import { Playfair_Display, Manrope } from "next/font/google";
    ```

3.  **Apaga** as constantes que configuravam essas fontes.

    ```tsx
    // APAGUE ESTAS LINHAS:
    const playfair = Playfair_Display({ 
      subsets: ["latin"], 
      variable: "--font-playfair"
    }); 

    const manrope = Manrope({
      subsets: ['latin'],
      variable: '--font-manrope',
      weight: ['400', '500', '700']
    });
    ```

4.  **Limpa** a tag `<html>`. Encontra a linha que começa com `<html ...>` e remove as variáveis de fonte.

    **Deixa assim:**
    ```tsx
    // ANTES (com as classes):
    <html lang="pt-BR" className={`${playfair.variable} ${manrope.variable}`}> 
    
    // DEPOIS (limpo):
    <html lang="pt-BR"> 
    ```

O teu arquivo `src/app/layout.tsx` está agora limpo e pronto para a nova fonte.

---

### Passo 3: Declarar a Fonte Satoshi no CSS Global

Agora, vamos "dizer" ao navegador que a fonte "Satoshi" existe e onde encontrar os arquivos que copiámos no Passo 1.

1.  **Abre o arquivo:** `src/app/globals.css`
2.  **Cola este código** no **topo absoluto** do arquivo, antes de tudo (antes do `:root`). Este bloco `@font-face` diz ao CSS como carregar cada peso da fonte:

    ```css
    /* src/app/globals.css */

    /* ======================================== */
    /* PASSO 3: COLA ESTE BLOCO NO TOPO DO ARQUIVO */
    /* ======================================== */
    @font-face {
      font-family: 'Satoshi'; /* Este é o NOME que dás à fonte */
      src: url('/fonts/Satoshi-Regular.woff2') format('woff2'); /* Caminho para o arquivo */
      font-weight: 400; /* 400 = Regular */
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'Satoshi';
      src: url('/fonts/Satoshi-Medium.woff2') format('woff2');
      font-weight: 500; /* 500 = Medium */
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'Satoshi';
      src: url('/fonts/Satoshi-Bold.woff2') format('woff2');
      font-weight: 700; /* 700 = Bold */
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'Satoshi';
      src: url('/fonts/Satoshi-Black.woff2') format('woff2');
      font-weight: 900; /* 900 = Black */
      font-style: normal;
      font-display: swap;
    }
    /* ======================================== */
    /* FIM DO BLOCO PARA COLAR                */
    /* ======================================== */
    

    /* O resto do teu globals.css começa aqui... */
    :root {
      /* ... */
    }
    ```

---

### Passo 4: Usar a Fonte "Satoshi" no teu Site

O último passo é dizer ao teu site para *usar* a fonte "Satoshi" que acabámos de declarar. Fazemos isto no mesmo arquivo, `src/app/globals.css`, dentro do bloco `:root`.

1.  **Continua no arquivo:** `src/app/globals.css`
2.  **Encontra** o bloco `:root { ... }`.
3.  **Substitui** as variáveis `--font-primary` e `--font-display` pelas novas.

    ```css
    /* src/app/globals.css */
    
    /* ... (bloco @font-face que acabaste de colar) ... */

    :root {
      /* ... (tuas variáveis de cores) ... */
    
      /* Fontes */
      /* SUBSTITUI ESTAS LINHAS: */
      --font-primary: 'General Sans', sans-serif;
      --font-display: 'General Sans', sans-serif;
    
      /* POR ESTAS: */
      --font-primary: 'Satoshi', sans-serif;
      --font-display: 'Satoshi', sans-serif;
    
      /* ... (resto das tuas variáveis) ... */
    }
    ```

### Conclusão

É tudo! Não precisas de mexer em mais nenhum arquivo.

**Porquê?**

* O teu `src/app/globals.css` já diz ao `body` para usar `var(--font-primary)` e aos títulos (`h1`, `h2`, etc.) para usar `var(--font-display)`.
* Ao mudarmos o *valor* dessas variáveis para "Satoshi", o site inteiro atualiza-se automaticamente.

Recarrega a tua página (pode ser preciso parar e dar `npm run dev` de novo) e a fonte Satoshi deverá aparecer.