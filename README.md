# 📚 Guia Completo de Desenvolvimento Web

Uma aplicação interativa e moderna que serve como referência completa para desenvolvimento web, com terminal funcional, exemplos práticos e recursos essenciais.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🚀 Sobre o Projeto

O **Guia Completo de Desenvolvimento Web** é uma aplicação web interativa que combina documentação, exemplos práticos e um terminal funcional em uma única interface. Projetado para desenvolvedores de todos os níveis, desde iniciantes até profissionais experientes.

### ✨ Características Principais

- **🖥️ Terminal Interativo**: Terminal totalmente funcional com comandos CLI simulados
- **📱 Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **🌓 Dark/Light Mode**: Tema automático baseado na preferência do sistema
- **⚡ Zero Dependências**: Vanilla JavaScript, HTML e CSS puros
- **🎨 Sistema de Design**: Tokens de design consistentes e reutilizáveis
- **🔧 Exemplos Executáveis**: Código JavaScript executável diretamente na interface

## 🛠️ Funcionalidades

### Terminal Interativo
- Sistema de arquivos virtual navegável
- Comandos CLI essenciais (`ls`, `pwd`, `cd`, `echo`, etc.)
- Executor de JavaScript integrado
- Calculadora matemática
- Histórico de comandos com navegação por setas
- Auto-complete e validação de comandos

### Seções de Conteúdo
- **💻 Terminal/CLI**: 10 comandos essenciais com exemplos
- **🏗️ HTML**: 10 elementos fundamentais com código
- **🎨 CSS**: 8 propriedades principais com exemplos
- **🧠 JavaScript**: 8 exemplos executáveis e interativos
- **🆓 Recursos**: 6 ferramentas gratuitas para desenvolvimento

### Interface Moderna
- Navegação por abas intuitiva
- Cards interativos com hover effects
- Notificações toast elegantes
- Animações suaves e transições
- Layout em grid responsivo

## 📦 Instalação

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, mas recomendado)

### Instalação Simples
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/guia-desenvolvimento-web.git
   cd guia-desenvolvimento-web
   ```

2. **Abra no navegador**:
   - **Opção 1**: Abra `index.html` diretamente no navegador
   - **Opção 2**: Use um servidor local (recomendado)

### Usando Servidor Local

#### Com Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Com Node.js:
```bash
# Instalar servidor global
npm install -g http-server

# Executar
http-server
```

#### Com PHP:
```bash
php -S localhost:8000
```

Acesse `http://localhost:8000` no navegador.

## 🎯 Como Usar

### Navegação Principal
1. **Visão Geral**: Overview de todas as seções com cards interativos
2. **Seções Específicas**: Use a navegação superior para acessar conteúdo específico
3. **Terminal**: Clique no botão "💻 Terminal Interativo" para abrir o terminal

### Terminal Interativo

#### Comandos Básicos
```bash
# Listar arquivos e diretórios
ls

# Mostrar diretório atual
pwd

# Navegar entre diretórios
cd projeto
cd ..

# Criar diretórios e arquivos
mkdir nova-pasta
touch novo-arquivo.txt

# Utilitários
echo "Hello World"
date
whoami
clear
```

#### Comandos JavaScript
```bash
# Executar código JavaScript
js console.log('Hello World')
js Math.random()
js new Date().toLocaleString()

# Calculadora matemática
calc 2 + 2 * 3
calc Math.PI * 10
```

#### Atalhos do Terminal
- **↑/↓**: Navegar pelo histórico de comandos
- **ESC**: Fechar terminal
- **Enter**: Executar comando
- **help**: Mostrar todos os comandos disponíveis

### Exemplos Executáveis
- Clique em **"Executar"** nos exemplos JavaScript para ver resultados
- Use **"Testar"** nos comandos para executá-los no terminal
- Resultados aparecem no terminal ou como notificações

## 🏗️ Estrutura do Projeto

```
guia-desenvolvimento-web/
├── index.html              # Página principal
├── style.css              # Estilos e sistema de design
├── app.js                 # Lógica da aplicação e terminal
├── README.md              # Este arquivo
└── docs/                  # Documentação adicional (opcional)
    ├── CONTRIBUTING.md
    └── CHANGELOG.md
```

### Arquitetura do Código

#### HTML (`index.html`)
- Estrutura semântica clara
- Seções organizadas por funcionalidade
- Acessibilidade integrada
- Meta tags para SEO

#### CSS (`style.css`)
- Sistema de design tokens
- Variáveis CSS customizadas
- Suporte a dark/light mode
- Grid layouts responsivos
- Componentes reutilizáveis

#### JavaScript (`app.js`)
- Classe `DevTerminal` para funcionalidade do terminal
- Sistema de navegação modular
- Event listeners organizados
- Funções utilitárias reutilizáveis

## 🎨 Sistema de Design

### Paleta de Cores
- **Primária**: Tons de teal/verde-azulado
- **Neutros**: Escala de cinzas e tons terra
- **Semânticas**: Sucesso, erro, aviso e informação
- **Fundos**: 8 cores suaves para destaque

### Tipografia
- **Primária**: FKGroteskNeue, Geist, Inter
- **Monoespaçada**: Berkeley Mono, SF Mono
- **Escala**: 9 tamanhos harmônicos (11px - 30px)

### Espaçamento
- **Sistema**: Base 4px com escala consistente
- **Containers**: Responsivos com max-width definido
- **Componentes**: Padding e margin padronizados

## 🔧 Personalização

### Modificando Cores
Edite as variáveis CSS em `style.css`:
```css
:root {
  --color-primary: #sua-cor-aqui;
  --color-background: #sua-cor-de-fundo;
  /* ... outras variáveis */
}
```

### Adicionando Comandos ao Terminal
No arquivo `app.js`, adicione novos casos ao método `executeCommand`:
```javascript
case 'seu-comando':
    this.seuMetodoPersonalizado(args);
    break;
```

### Criando Novas Seções
1. Adicione HTML para a nova seção
2. Crie botão de navegação correspondente
3. Implemente lógica de exibição no JavaScript

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
4. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. **Push** para a branch (`git push origin feature/AmazingFeature`)
6. **Abra** um Pull Request

### Diretrizes de Contribuição
- Mantenha consistência com o estilo de código existente
- Adicione comentários explicativos em código novo
- Teste em diferentes navegadores
- Documente novas funcionalidades

## 📋 Roadmap

### Versão 2.0.0
- [ ] Sistema de plugins para extensibilidade
- [ ] Modo PWA (Progressive Web App)
- [ ] Exportação de sessões do terminal
- [ ] Temas personalizáveis
- [ ] Suporte a múltiplas linguagens

### Versão 1.1.0
- [ ] Mais comandos do terminal
- [ ] Sistema de help contextual
- [ ] Autocomplete avançado
- [ ] Sintaxe highlighting no terminal

## 🐛 Problemas Conhecidos

- [ ] Terminal pode ter problemas em telas muito pequenas (< 320px)
- [ ] Alguns comandos JavaScript não funcionam no modo strict
- [ ] Dark mode não persiste entre sessões

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos Testados
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iOS, Android)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Dev Guide Team**
- Website: [seu-website.com](https://seu-website.com)
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [seu-linkedin](https://linkedin.com/in/seu-linkedin)

## 🙏 Agradecimentos

- [MDN Web Docs](https://developer.mozilla.org) - Referência técnica
- [W3Schools](https://www.w3schools.com) - Tutoriais e exemplos
- [Can I Use](https://caniuse.com) - Compatibilidade de navegadores
- Comunidade de desenvolvedores por feedback e sugestões

## 📊 Estatísticas

- **Linhas de código**: ~1,500 (HTML + CSS + JS)
- **Tamanho**: ~35KB total
- **Dependências**: 0 (zero)
- **Comandos do terminal**: 15+
- **Exemplos de código**: 35+

---

<div align="center">

**[⬆ Voltar ao topo](#-guia-completo-de-desenvolvimento-web)**

Feito com ❤️ para a comunidade de desenvolvedores

</div>