# Resumo do Progresso - Portfólio Next.js (21/10/2025)

Este arquivo resume o trabalho realizado hoje no desenvolvimento do portfólio pessoal utilizando Next.js.

## 1. Mudança de Framework e Configuração Inicial

* Decidimos **abandonar o projeto inicial em Create React App** e recomeçar utilizando **Next.js**.
* Criamos um novo projeto Next.js via `npx create-next-app@latest`.
* **Configurações escolhidas:**
    * TypeScript
    * ESLint
    * Tailwind CSS (inicialmente, depois optamos por CSS Modules)
    * Diretório `src/`
    * App Router (recomendado)
    * Alias de importação padrão (`@/*`)

## 2. Instalação de Bibliotecas Adicionais

Instalamos as seguintes bibliotecas para funcionalidades futuras e atuais:

* `gsap`: Para animações avançadas.
* `locomotive-scroll`: Para scroll suave.
* `react-icons`: Para facilitar o uso de ícones SVG.
* `framer-motion`: Para animações declarativas em React.

```bash
npm install gsap locomotive-scroll react-icons framer-motion