Com certeza\! Esta é uma excelente forma de documentar ideias de projeto.

Aqui está a conversão completa da nossa discussão anterior para um ficheiro Markdown (`.md`), com todos os passos e blocos de código formatados para que você possa guardar e consultar no futuro.

-----

# Plano de Ideia: Dashboard Administrativo do Portfólio

**Data:** 11 de novembro de 2025
**Status:** Ideia / Planeamento

## Objetivo

Implementar uma área administrativa (`/adm`) para o site do portfólio com os seguintes recursos, **sem a necessidade de construir um backend complexo e separado**:

1.  **Analytics:** Visualizar métricas de acesso (pageviews, visitantes, tempo na página).
2.  **Formulários:** Ver os dados preenchidos no formulário de contato.

## Tecnologias Propostas

Este plano utiliza o ecossistema da **Vercel** para criar um "backend-como-serviço" (BaaS) de forma simples e robusta, integrado ao Next.js:

  * **Vercel Analytics:** Para todas as métricas de tráfego (Solução "sem código").
  * **Vercel KV:** Um banco de dados Redis "serverless" para armazenar os dados do formulário.
  * **Next.js API Routes:** Funções "serverless" que atuarão como nosso mini-backend para ler e escrever no banco de dados.
  * **Vercel Password Protection:** Para proteger a rota `/adm` e as APIs relacionadas de forma simples.

-----

## Parte 1: Analytics (Acessos, Tempo de Página, etc.)

Esta parte é resolvida **sem código**.

### 1.1. Ação

1.  Aceda ao dashboard do seu projeto na **Vercel**.
2.  Vá para a aba **"Analytics"**.
3.  Clique em **"Enable"**.

Após ativado, o Vercel começará a recolher e exibir automaticamente as métricas de tráfego, resolvendo o requisito de "quantidade de acessos", "tempo de navegação", etc.

-----

## Parte 2: Coleta de Dados do Formulário (Gravação)

Aqui, faremos com que o formulário do `Footer.tsx` envie os dados para a nossa API, que por sua vez os salvará no Vercel KV.

### 2a. Configurar o Banco de Dados (Vercel KV)

1.  No dashboard Vercel do seu projeto, vá para a aba **"Storage"**.
2.  Clique em **"Create Database"** e escolha **"KV (Redis)"**.
3.  Siga os passos de criação (nome, região).
4.  Após criar, clique em **"Connect"** e ligue-o ao seu projeto. O Vercel irá injetar as variáveis de ambiente (ex: `KV_URL`) automaticamente.
5.  Instale o pacote cliente no seu projeto local:
    ```bash
    npm install @vercel/kv
    ```

### 2b. Criar API para Salvar (o "Mini-Backend")

Vamos criar o endpoint que recebe os dados do formulário.

**Novo Ficheiro: `src/app/api/contact/route.ts`**

```typescript
/**
 * @file src/app/api/contact/route.ts
 * @description Rota de API (Serverless Function) para lidar com submissões 
 * do formulário de contato.
 *
 * Esta função é executada no servidor e é responsável por:
 * 1. Receber dados (via POST) do formulário do cliente.
 * 2. Validar os dados recebidos.
 * 3. Armazenar os dados de forma segura no Vercel KV.
 */
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

/**
 * @function POST
 * @description Lida com requisições POST para /api/contact.
 * Salva a submissão do formulário no Vercel KV.
 *
 * @param {Request} request O objeto da requisição, contendo o JSON do formulário.
 * @returns {NextResponse} Uma resposta JSON indicando sucesso ou falha.
 */
export async function POST(request: Request) {
  try {
    // 1. Analisar os dados do corpo da requisição
    const data = await request.json();

    // 2. Validar dados (simples)
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { message: 'Campos obrigatórios em falta.' },
        { status: 400 } // Bad Request
      );
    }

    // 3. Criar um ID único para esta entrada (usando timestamp)
    const submissionId = `submission:${Date.now()}`;
    
    // 4. Salvar no Vercel KV
    
    // 4a. Salva o objeto de dados completo com o ID único.
    // O 'set' armazena um par chave-valor.
    await kv.set(submissionId, data);
    
    // 4b. Adiciona o ID a uma lista 'index'.
    // 'lpush' (List Push) adiciona ao *início* da lista.
    // Isto permite-nos buscar os IDs das submissões mais recentes facilmente.
    await kv.lpush('contactSubmissions', submissionId);

    // 5. Responder ao cliente com sucesso
    return NextResponse.json(
      { message: 'Formulário recebido com sucesso!' },
      { status: 200 } // OK
    );

  } catch (error) {
    // 6. Lidar com erros
    console.error('Erro ao salvar no Vercel KV:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 } // Internal Server Error
    );
  }
}
```

### 2c. Atualizar o Formulário (Footer.tsx)

Modificamos a função `handleSubmit` no `Footer.tsx` para usar `fetch` e enviar os dados para a API que acabámos de criar.

**Ficheiro Modificado: `src/components/Footer.tsx`** (Apenas a função `handleSubmit`)

```typescript
// ... (resto das importações e do componente)

  /**
   * @function handleSubmit
   * @description Lida com o evento de submissão do formulário.
   * 1. Previne o comportamento padrão (recarregar a página).
   * 2. Valida o formulário.
   * 3. Define o estado para 'isSubmitting' (para mostrar o loading).
   * 4. !! NOVO: Envia os 'formData' para a nossa API Route (/api/contact) usando fetch.
   * 5. Lida com a resposta (sucesso ou erro).
   * 6. Limpa o formulário e o estado 'isSubmitted' após 5 segundos.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 1. Previne recarregamento
    if (!validateForm()) return; // 2. Valida
    setIsSubmitting(true); // 3. Ativa o loading
    
    try {
      // 4. Envia os dados para a API
      // 'fetch' é a API nativa do browser para fazer requisições de rede.
      const response = await fetch('/api/contact', {
        method: 'POST', // Usamos o método POST
        headers: {
          'Content-Type': 'application/json', // Dizemos ao servidor que estamos a enviar JSON
        },
        body: JSON.stringify(formData), // Convertemos o estado (objeto JS) para uma string JSON
      });
      
      // 5. Lida com a resposta
      // Se a resposta do servidor não for 'ok' (ex: status 400 ou 500),
      // lançamos um erro para cair no bloco 'catch'.
      if (!response.ok) {
        throw new Error('Falha ao enviar o formulário.');
      }
      
      // --- O seu código original de sucesso ---
      console.log('Dados do formulário enviados:', formData);
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'form_submit', {
          event_category: 'contact',
          event_label: 'footer_form'
        });
      }
      
      // 6. Limpa o formulário
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '', email: '', phone: '', company: '', message: ''
        });
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      // Aqui pode-se adicionar um estado de erro para o utilizador
    } finally {
      setIsSubmitting(false); // Desativa o loading, mesmo se der erro
    }
  };

// ... (resto do JSX e do componente)
```

-----

## Parte 3: Dashboard de Admin (Leitura e Visualização)

Criaremos a página `/adm` (protegida por senha) que busca e exibe os dados que acabámos de salvar.

### 3a. Segurança (Proteção da Rota)

O método mais simples e "sem código" é usar a **Password Protection** da Vercel.

1.  No dashboard Vercel do seu projeto, vá para **"Settings"** \> **"Security"**.
2.  Ative a **"Password Protection"**.
3.  Defina uma senha.

**Resultado:** Todo o site (incluindo a nova página `/adm` e a API `/api/adm/*`) agora pedirá esta senha, protegendo os seus dados.

### 3b. Criar API para Ler os Dados

Esta API será chamada pela nossa página `/adm` para buscar as submissões.

**Novo Ficheiro: `src/app/api/adm/submissions/route.ts`**

```typescript
/**
 * @file src/app/api/adm/submissions/route.ts
 * @description Rota de API SEGURA para buscar submissões do formulário.
 * Esta rota é protegida pela "Password Protection" do Vercel.
 */
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

/**
 * @function GET
 * @description Lida com requisições GET para /api/adm/submissions.
 * 1. Busca os últimos 50 IDs de submissão da lista 'contactSubmissions'.
 * 2. Busca os dados completos de cada submissão.
 *
 * @returns {NextResponse} Uma resposta JSON com a lista de submissões ou um erro.
 */
export async function GET() {
  try {
    // 1. Buscar a lista de IDs (os últimos 50, da 'lpush' que fizemos)
    // 'lrange' (List Range) busca itens de uma lista.
    // '0' é o mais recente (início da lista), '49' é o 50º.
    const submissionIds = await kv.lrange('contactSubmissions', 0, 49);

    if (!submissionIds || submissionIds.length === 0) {
      return NextResponse.json([], { status: 200 }); // Retorna array vazio
    }

    // 2. Para cada ID, buscar o objeto de dados completo
    // 'kv.mget' (multi-get) é otimizado para buscar várias chaves de uma só vez.
    const submissions = await kv.mget(...submissionIds);

    // 3. Responder com os dados completos
    return NextResponse.json(submissions, { status: 200 });

  } catch (error) {
    console.error('Erro ao buscar submissões:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
```

### 3c. Criar a Página do Dashboard (UI)

Esta é a página de frontend que você irá aceder em `seusite.com/adm`.

**Novo Ficheiro: `src/app/adm/page.tsx`**

```tsx
// src/app/adm/page.tsx
"use client"; // Esta página é um Componente de Cliente

import React, { useState, useEffect } from 'react';
import styles from './adm.module.css'; // Estilos que criaremos a seguir

// Interface para os dados do formulário (deve ser igual à do Footer)
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

/**
 * @page AdminDashboard
 * @description Página de administração para ver submissões do formulário.
 * Protegida pela "Password Protection" do Vercel.
 * Busca e exibe dados da nossa API interna (/api/adm/submissions).
 */
export default function AdminDashboard() {
  // Estados da página
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * @function fetchSubmissions
   * @description Função assíncrona para buscar os dados da API de admin.
   */
  const fetchSubmissions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Chama a API que criámos
      const response = await fetch('/api/adm/submissions');
      
      if (!response.ok) {
        throw new Error('Falha ao buscar dados (Verifique a API e a senha)');
      }
      
      const data = await response.json();
      setSubmissions(data);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Hook 'useEffect' para buscar os dados quando a página carregar.
   * O array de dependências vazio `[]` significa que isto corre 
   * apenas uma vez, quando o componente é montado.
   */
  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Renderização da UI do Dashboard
  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <h1>Dashboard Administrativo</h1>
        <button 
          onClick={fetchSubmissions} 
          disabled={isLoading}
          className={styles.refreshButton}
        >
          {isLoading ? 'Atualizando...' : 'Atualizar'}
        </button>
      </header>
      
      <main>
        <h2>Últimas Submissões do Formulário</h2>
        
        {/* Lógica de renderização condicional */}
        {isLoading && <p>Carregando dados...</p>}
        {error && <p className={styles.errorText}>Erro: {error}</p>}
        
        {!isLoading && !error && submissions.length === 0 && (
          <p>Nenhuma submissão encontrada.</p>
        )}

        {/* Lista de Submissões */}
        <div className={styles.submissionList}>
          {submissions.map((submission, index) => (
            <div key={index} className={styles.submissionCard}>
              <h3>De: {submission.name}</h3>
              <p><strong>Email:</strong> <a href={`mailto:${submission.email}`}>{submission.email}</a></p>
              {submission.phone && <p><strong>Telefone:</strong> {submission.phone}</p>}
              {submission.company && <p><strong>Empresa:</strong> {submission.company}</p>}
              <p><strong>Mensagem:</strong></p>
              {/* Usamos <pre> para preservar a formatação da mensagem */}
              <pre>{submission.message}</pre> 
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
```

### 3d. Estilos da Página de Admin

**Novo Ficheiro: `src/app/adm/adm.module.css`**

```css
/* src/app/adm/adm.module.css */

/* Usamos as variáveis do seu globals.css para manter a consistência */
.adminContainer {
  font-family: var(--font-primary, sans-serif);
  background-color: var(--color-background-accent, #F5F5F5);
  color: var(--color-text-primary, #1A1A1A);
  min-height: 100vh;
  padding: 2rem;
}

.adminHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--color-border, #E0E0E0);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

.adminHeader h1 {
  color: var(--color-text-highlight, #000);
  margin: 0;
}

.refreshButton {
  background: var(--color-primary, #121212);
  color: var(--color-background-light, #FFFFFF);
  border: none;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-primary, sans-serif);
  font-weight: 500;
  border-radius: var(--border-radius-sm, 4px);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.refreshButton:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refreshButton:hover:not(:disabled) {
  background-color: var(--color-primary-dark, #333);
}

.errorText {
  color: #d93025; /* Cor de erro forte */
  font-weight: 500;
}

.submissionList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.submissionCard {
  background-color: var(--color-background-light, #FFFFFF);
  border: 1px solid var(--color-border, #E0E0E0);
  border-radius: var(--border-radius-md, 8px);
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.submissionCard h3 {
  margin-top: 0;
  color: var(--color-text-highlight, #000);
}

.submissionCard p {
  margin: 0.5rem 0;
  line-height: 1.6;
}

/* <pre> é usado para mostrar a mensagem mantendo as quebras de linha */
.submissionCard pre {
  background: var(--color-background-accent, #F5F5F5);
  padding: 1rem;
  border-radius: var(--border-radius-sm, 4px);
  white-space: pre-wrap; /* Quebra a linha nas mensagens */
  word-wrap: break-word;
  font-family: var(--font-primary, sans-serif);
  margin-top: 0.5rem;
}
```