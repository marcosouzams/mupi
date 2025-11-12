# Resolução de Problemas de SEO - Metadata fora do <head>

## Problema Identificado

Os metadados (canonicals, hreflang, page titles, meta descriptions) estavam sendo renderizados fora da tag `<head>`, o que prejudica o SEO.

## Causa Raiz

O Next.js 13+ tem requisitos específicos para metadata:

1. **Metadata deve ser exportado como constante ou via `generateMetadata()`**
2. **Quando a página usa funções assíncronas do Next.js (como `cookies()` ou `headers()`), deve-se usar `generateMetadata()` em vez de `export const metadata`**
3. **O `viewport` deve ser exportado separadamente, não dentro do objeto `metadata`**

## Solução Implementada

### 1. Mudança de `export const metadata` para `export async function generateMetadata()`

**Antes (❌ Incorreto):**
```tsx
export const metadata: Metadata = {
  // ...metadata
};

const HomePage = async () => {
  const currentLang = await getLanguageFromCookies(); // Uso de cookies!
  // ...
};
```

**Depois (✅ Correto):**
```tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://mupisystems.com.br'),
    title: 'MUPI Systems - Soluções Digitais Inovadoras...',
    // ...resto do metadata
  };
}

const HomePage = async () => {
  const currentLang = await getLanguageFromCookies();
  // ...
};
```

### 2. Separação do Viewport

**Antes (❌ Incorreto):**
```tsx
export const metadata: Metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  // ...
};
```

**Depois (✅ Correto):**
```tsx
export const metadata: Metadata = {
  // ...metadata sem viewport
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};
```

### 3. Uso Correto do metadataBase

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://mupisystems.com.br'),
  // Usar URLs relativas para que o Next.js construa corretamente
  alternates: {
    canonical: '/',  // ✅ Relativo
    languages: {
      'pt-BR': '/',
      'en': '/en',
      'es': '/es',
    },
  },
};
```

## Arquivos Modificados

1. **`src/app/page.tsx`**
   - Mudou de `export const metadata` para `export async function generateMetadata()`
   - Mantém metadataBase configurado

2. **`src/app/layout.tsx`**
   - Separou `viewport` do `metadata`
   - Mantém metadataBase no root layout

## Como Verificar se Está Funcionando

### 1. Em Desenvolvimento

```bash
npm run dev
```

Abra o DevTools e inspecione o `<head>`. Você deve ver:
- `<meta name="description" content="...">`
- `<link rel="canonical" href="https://mupisystems.com.br/">`
- `<link rel="alternate" hreflang="pt-BR" href="https://mupisystems.com.br/">`
- `<link rel="alternate" hreflang="en" href="https://mupisystems.com.br/en">`
- etc.

### 2. Em Produção

```bash
npm run build
npm start
```

Depois visite `http://localhost:3000` e visualize o código-fonte (Ctrl+U ou Cmd+U).

Todos os meta tags devem estar dentro de `<head>...</head>`.

### 3. Usando Ferramentas SEO

- **Google Search Console**: Inspecionar URL
- **Lighthouse**: Rodar auditoria de SEO (deve dar 95-100)
- **Schema.org Validator**: Validar structured data
- **Rich Results Test**: Verificar dados estruturados

## Resultados Esperados

Após a correção, as ferramentas de SEO devem mostrar:

✅ **Canonicals**: Dentro de `<head>` e corretamente configurado
✅ **Hreflang**: Dentro de `<head>` com todas as alternativas de idioma
✅ **Page Title**: Dentro de `<head>`
✅ **Meta Description**: Dentro de `<head>`
✅ **Open Graph**: Todos os meta tags OG dentro de `<head>`
✅ **Twitter Cards**: Todos os meta tags twitter dentro de `<head>`

## Warnings Restantes (Aceitáveis)

### ⚠️ Multiple H2 Tags
**Status**: Não é um problema!

Ter múltiplas tags H2 é correto quando estruturam diferentes seções:
- Hero Section: H1
- Partners Section: H2
- Products Section: H2
- About Section: H2
- Cases Section: H2
- Contact Section: H2

Isso cria uma hierarquia semântica adequada.

### ⚠️ High External Outlinks
**Status**: Não é um problema!

Apenas 2 links externos, ambos para plataformas próprias da MUPI (etalentos.com.br):
- Ambos com `rel="noopener noreferrer"`
- Ambos com `aria-label` descritivo
- Quantidade bem dentro dos limites aceitáveis

### ⚠️ Canonicals: Missing
**Status**: Verificar em produção

Este warning pode aparecer em ambiente de desenvolvimento ou domínio de teste. 

**Solução**: Ao fazer deploy no domínio definitivo (mupisystems.com.br), o canonical será automaticamente resolvido pelo `metadataBase`.

Se estiver testando em outro domínio (ex: netlify, vercel preview), você pode:
1. Temporariamente mudar o `metadataBase` para o domínio de teste
2. Ou ignorar este warning até o deploy final

## Checklist Final

- [x] `generateMetadata()` implementado em page.tsx
- [x] `metadataBase` configurado em layout.tsx e page.tsx
- [x] `viewport` exportado separadamente
- [x] URLs canônicas usando paths relativos
- [x] Hreflang configurado para pt-BR, en, es
- [x] Open Graph metadata completo
- [x] Twitter Cards configurado
- [x] Content-Security-Policy header adicionado
- [x] Structured data (JSON-LD) implementado
- [x] Sitemap.xml gerado dinamicamente
- [x] Robots.txt configurado

## Próximos Passos

1. **Deploy para produção** no domínio definitivo
2. **Verificar no Google Search Console** que todos os meta tags estão corretos
3. **Rodar Lighthouse** e verificar score de SEO (esperado: 95-100)
4. **Submeter sitemap** para Google e Bing
5. **Monitorar Core Web Vitals**

## Notas Importantes

- ⚠️ Em ambiente de desenvolvimento, alguns warnings podem persistir
- ✅ Em produção, com o domínio correto, todos os issues devem ser resolvidos
- 📊 O build de produção (`npm run build`) não deve ter erros
- 🎯 Lighthouse deve dar score 95+ após deploy em produção
