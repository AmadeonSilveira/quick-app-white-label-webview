const fs = require("fs");
const path = require("path");

const clientName = process.argv[2];

if (!clientName) {
  console.error("Informe o nome do cliente. Ex: node build-client.js cliente-exemplo");
  process.exit(1);
}

//caminhos base
const baseDir = __dirname;
const appDir = path.join(baseDir, "app-default");
const clientDir = path.join(baseDir, "clients", clientName);
const clientAssetsDir = path.join(clientDir, "assets");

//caminhos dos arquivos
const templatePath = path.join(appDir, "app-template.json");
const clientConfigPath = path.join(clientDir, "config.json");
const outputAppJson = path.join(appDir, "app.json");
const outputClientConfig = path.join(appDir, "client-config.json");
const outputAssetsDir = path.join(appDir, "assets");

//validações
if (!fs.existsSync(clientConfigPath)) {
  console.error(`Configuração não encontrada para '${clientName}'. Verifique se o arquivo 'clients/${clientName}/config.json' existe.`);
  process.exit(1);
}

if (!fs.existsSync(templatePath)) {
  console.error(`Template app-template.json não encontrado em ${templatePath}`);
  process.exit(1);
}

//leitura e substituição do app.template.json
const config = JSON.parse(fs.readFileSync(clientConfigPath, "utf8"));
let template = fs.readFileSync(templatePath, "utf8");

Object.entries(config).forEach(([key, value]) => {
  const placeholder = `{{${key}}}`;
  template = template.replaceAll(placeholder, value);
});

//salva o app.json final
fs.writeFileSync(outputAppJson, template);

//copia os assets do cliente para o projeto
if (!fs.existsSync(outputAssetsDir)) {
  fs.mkdirSync(outputAssetsDir);
}

const assetFiles = ["icon.png", "adaptive-icon.png", "splash.png", "favicon.png"];
assetFiles.forEach(file => {
  const source = path.join(clientAssetsDir, file);
  const destination = path.join(outputAssetsDir, file);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, destination);
    console.log(`✓ Copiado: ${file}`);
  } else {
    console.warn(`Arquivo não encontrado: ${file}`);
  }
});

//cria o client-config.json com a URL
fs.writeFileSync(outputClientConfig, JSON.stringify({
  webviewUrl: config.webviewUrl,
  cor1: config.cor1 || "#1C1C1C",
  cor2: config.cor2 || "#0D0D0D"
}, null, 2));

console.log(`Cliente '${clientName}' configurado com sucesso!`);
console.log(`Pronto para rodar: cd app-default && npx expo start`);
