# Quick App White Label com Webview

Este repositório contém a casca padrão para criação rápida de cascas de apps white label, desenvolvidos em **React Native com Expo**, utilizando **WebView** e estrutura dinâmica para múltiplos clientes.

---

## Visão Geral

Cada cliente possui:
- URL exclusiva para o WebView
- Ícones, splash e cores personalizados
- Nome do app e identificador únicos
- Configurações separadas via JSON

---

## Estrutura de Pastas

```
quick-app-white-label-webview/
├── app-default/               # Projeto base Expo
│   ├── App.tsx                # Lógica principal (usa client-config.json)
│   ├── app-template.json      # Template com placeholders
│   ├── client-config.json     # Gerado automaticamente
│   └── assets/                # Imagens substituídas no build
├── clients/
│   └── cliente-exemplo/
│       ├── config.json        # Configurações do cliente
│       └── assets/            # Ícones e splash específicos
├── build-client.js            # Script para gerar o app.json e assets
└── README.md
```

---

## Passo a Passo

### 1. Instalar dependências

```bash
cd app-default
npm install
```

---

### 2. Adicionar novo cliente

Crie a pasta `clients/cliente-nome/` com:

- `config.json`:
```json
{
  "name": "Nome do App",
  "slug": "slug-do-app",
  "version": "1.0.0",
  "package": "com.dominio.nomedoapp",
  "webviewUrl": "https://exemplo.com",
  "backgroundColor": "#123456",
  "cor1": "#141414",
  "cor2": "#0D0D0D"
}
```

- Pasta `assets/` com as imagens:
  - `icon.png`
  - `adaptive-icon.png`
  - `splash.png`
  - `favicon.png`

---

### 3. Gerar app configurado

Rode o script para montar os arquivos de build para um cliente:

```bash
node build-client.js cliente-nome
```

Isso irá:
- Substituir placeholders no `app-template.json` → `app.json`
- Gerar `client-config.json` com `webviewUrl`, `cor1`, `cor2`
- Copiar os ícones para a pasta correta (`app-default/assets`)

---

### 4. Rodar em modo de desenvolvimento

```bash
cd app-default
npx expo start
```

---

### 5. Configurar credenciais (somente 1ª vez)

#### Android:

```bash
eas credentials --platform android
```

- Gere ou reutilize um keystore
- Configure a conta correta (empresa)

#### iOS:

```bash
eas credentials --platform ios
```

- Faça login na conta Apple
- Reutilize certificado se possível
- Deixe o Expo gerar o `provisioning profile`

---

### 6. Build local (pode ser feita pela nuvem do expo)

> Exige Xcode instalado para iOS.

```bash
cd app-default
eas build --local --platform android --profile production
eas build --local --platform ios --profile production
```

O `.aab` e `.ipa` serão gerados e podem ser encontrados no terminal após o build.

---

### 7. Enviar para as lojas

#### Google Play (Android)

1. Acesse o [Google Play Console](https://play.google.com/console/)
2. Crie um novo app com:
   - Nome do cliente
   - Idioma padrão: `pt-BR`
   - `package` do `config.json`
3. Envie o `.aab` ou `.apk` gerado
4. Preencha a ficha do app
5. Publique

#### Apple App Store (iOS)

1. Abra o projeto com Xcode (após `expo prebuild`, se necessário)
2. Faça o Archive (`Product > Archive`)
3. Exporte `.ipa` e envie via **Transporter** ou direto no Xcode Organizer
4. Acesse [App Store Connect](https://appstoreconnect.apple.com/)
5. Crie o app com o mesmo `bundleIdentifier`
6. Preencha metadados e envie para revisão

---

## Dicas

- Use `eas build --profile production` sempre para builds de produção
- Mantenha as credenciais seguras com `eas credentials`
- Para builds automatizadas futuras, considere scripts de CI ou EAS Pipelines

---

## Para Desenvolvedores

Este repositório foi criado para facilitar a criação de aplicativos **white label com WebView**, com foco em escalabilidade, reutilização e agilidade na publicação.

Sinta-se à vontade para adaptar a estrutura, integrar novas automações ou expandir o suporte para múltiplos perfis de apps.

---

### Boas práticas sugeridas:
- Mantenha os `clients/` bem organizados, nomeando as pastas com clareza
- Documente qualquer ajuste específico de cliente no próprio `config.json`
- Evite hardcoded no código — todas as variáveis dinâmicas devem vir do `client-config.json`
- Faça testes com `npx expo start --clear` sempre que trocar de cliente para garantir a limpeza do cache

---

## Futuras implementações

As próximas melhorias previstas para este repositório incluem:

- Geração automatizada das builds locais via `eas build --local`
- Publicação automática na nuvem com `eas build` + `eas submit`
- Integração com CI para builds recorrentes e por demanda
- Testes de verificação automática após geração de cada build
