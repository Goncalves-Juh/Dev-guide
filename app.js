// Application State
let currentSection = 'all';
let terminal = null;

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando aplicação...');
    
    // Initialize terminal
    terminal = new DevTerminal();
    
    // Setup navigation
    setupNavigation();
    
    // Setup section switching
    setupSectionSwitching();
    
    // Setup test buttons
    setupTestButtons();
    
    console.log('✅ Aplicação inicializada com sucesso!');
    showToast('✨ Guia carregado com terminal funcional!');
});

// Terminal Class
class DevTerminal {
    constructor() {
        this.currentPath = '/home/dev-guide';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isOpen = false;
        
        // Virtual file system
        this.fileSystem = {
            '/home/dev-guide': {
                type: 'directory',
                files: ['index.html', 'style.css', 'app.js', 'README.md'],
                directories: ['projeto', 'docs']
            },
            '/home/dev-guide/projeto': {
                type: 'directory',
                files: ['main.js', 'style.css', 'index.html'],
                directories: []
            },
            '/home/dev-guide/docs': {
                type: 'directory',
                files: ['guia.md', 'tutorial.txt'],
                directories: []
            }
        };
        
        this.setupEventListeners();
        console.log('💻 Terminal inicializado');
    }

    setupEventListeners() {
        // Terminal toggle button
        const toggleBtn = document.getElementById('terminal-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }

        // Terminal close button
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Terminal input
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            terminalInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        }

        console.log('⚡ Event listeners configurados');
    }

    handleKeydown(e) {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                this.processCommand();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
            case 'Escape':
                this.close();
                break;
        }
    }

    processCommand() {
        const input = document.getElementById('terminal-input');
        const command = input.value.trim();
        
        if (command === '') return;

        // Add to history
        this.addToHistory(command);
        
        // Display command
        this.addOutput(`<span class="terminal-prompt">user@dev-guide:${this.getShortPath()}$</span> <span class="terminal-command">${this.escapeHtml(command)}</span>`);

        // Execute command
        this.executeCommand(command);

        // Clear input and reset history index
        input.value = '';
        this.historyIndex = -1;

        // Scroll to bottom
        this.scrollToBottom();
    }

    executeCommand(command) {
        const parts = command.trim().split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        console.log(`🔧 Executando comando: ${cmd}`, args);

        switch (cmd) {
            case 'help':
                this.showHelp();
                break;
            case 'clear':
            case 'cls':
                this.clearTerminal();
                break;
            case 'ls':
            case 'dir':
                this.listFiles(args);
                break;
            case 'pwd':
                this.printWorkingDirectory();
                break;
            case 'cd':
                this.changeDirectory(args[0]);
                break;
            case 'echo':
                this.echoText(args.join(' '));
                break;
            case 'date':
                this.showDate();
                break;
            case 'whoami':
                this.showUser();
                break;
            case 'js':
                this.executeJavaScript(args.join(' '));
                break;
            case 'calc':
                this.calculator(args.join(' '));
                break;
            case 'mkdir':
                this.makeDirectory(args[0]);
                break;
            case 'touch':
                this.createFile(args[0]);
                break;
            default:
                this.addOutput(`<span class="terminal-error">Comando não encontrado: ${this.escapeHtml(cmd)}</span>`);
                this.addOutput(`<span class="terminal-info">Digite 'help' para ver os comandos disponíveis</span>`);
        }
    }

    showHelp() {
        const helpText = `
<span class="terminal-success">📋 Comandos Disponíveis:</span>

<span class="terminal-info">🗂️  Sistema de Arquivos:</span>
  ls, dir          - Listar arquivos e pastas
  pwd              - Mostrar diretório atual
  cd &lt;pasta&gt;       - Navegar para pasta
  mkdir &lt;nome&gt;     - Criar diretório
  touch &lt;arquivo&gt;  - Criar arquivo

<span class="terminal-info">🧠 JavaScript:</span>
  js &lt;código&gt;      - Executar código JavaScript
  calc &lt;expr&gt;     - Calculadora (ex: calc 2 + 2)

<span class="terminal-info">🔨 Utilitários:</span>
  echo &lt;texto&gt;     - Imprimir texto
  date             - Mostrar data e hora
  whoami           - Mostrar usuário
  clear, cls       - Limpar terminal
  help             - Mostrar esta ajuda

<span class="terminal-info">⌨️  Atalhos:</span>
  ↑/↓ - Navegar no histórico
  Esc - Fechar terminal`;
        
        this.addOutput(helpText);
    }

    clearTerminal() {
        const output = document.getElementById('terminal-output');
        if (output) {
            output.innerHTML = `
                <div class="terminal-line">
                    <span class="terminal-welcome">🚀 Bem-vindo ao Dev Guide Terminal!</span>
                </div>
                <div class="terminal-line">
                    <span class="terminal-info">Digite 'help' para ver os comandos disponíveis</span>
                </div>
                <div class="terminal-line">
                    <span class="terminal-info">Use 'js &lt;código&gt;' para executar JavaScript</span>
                </div>
            `;
        }
    }

    listFiles(args) {
        const currentDir = this.fileSystem[this.currentPath];
        if (!currentDir) {
            this.addOutput(`<span class="terminal-error">Diretório não encontrado</span>`);
            return;
        }

        const showDetails = args.includes('-la') || args.includes('-l');
        
        if (showDetails) {
            this.addOutput(`<span class="terminal-info">total ${currentDir.files.length + currentDir.directories.length}</span>`);
        }

        // List directories
        currentDir.directories.forEach(dir => {
            if (showDetails) {
                this.addOutput(`<span class="terminal-info">drwxr-xr-x 2 user user 4096 Jan 1 12:00 📁 ${dir}/</span>`);
            } else {
                this.addOutput(`<span class="terminal-info">📁 ${dir}/</span>`);
            }
        });

        // List files
        currentDir.files.forEach(file => {
            if (showDetails) {
                this.addOutput(`<span class="terminal-info">-rw-r--r-- 1 user user 1024 Jan 1 12:00 📄 ${file}</span>`);
            } else {
                this.addOutput(`<span class="terminal-info">📄 ${file}</span>`);
            }
        });
    }

    printWorkingDirectory() {
        this.addOutput(`<span class="terminal-info">${this.currentPath}</span>`);
    }

    changeDirectory(path) {
        if (!path) {
            this.currentPath = '/home/dev-guide';
            this.updatePrompt();
            return;
        }

        if (path === '..') {
            const parts = this.currentPath.split('/').filter(p => p);
            if (parts.length > 2) { // Don't go above /home/dev-guide
                parts.pop();
                this.currentPath = '/' + parts.join('/');
            }
            this.updatePrompt();
            return;
        }

        // Check if directory exists
        let newPath;
        if (path.startsWith('/')) {
            newPath = path;
        } else {
            newPath = this.currentPath + '/' + path;
        }

        if (this.fileSystem[newPath]) {
            this.currentPath = newPath;
            this.addOutput(`<span class="terminal-success">📁 Navegando para: ${path}</span>`);
            this.updatePrompt();
        } else {
            this.addOutput(`<span class="terminal-error">Diretório não encontrado: ${path}</span>`);
        }
    }

    echoText(text) {
        // Remove quotes if present
        text = text.replace(/^["']|["']$/g, '');
        this.addOutput(`<span class="terminal-result">${this.escapeHtml(text)}</span>`);
    }

    showDate() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        this.addOutput(`<span class="terminal-info">🕒 ${formattedDate}</span>`);
    }

    showUser() {
        this.addOutput(`<span class="terminal-success">👤 dev-guide-user</span>`);
        this.addOutput(`<span class="terminal-info">Terminal do Guia de Desenvolvimento Web</span>`);
    }

    executeJavaScript(code) {
        if (!code.trim()) {
            this.addOutput(`<span class="terminal-error">js: código JavaScript necessário</span>`);
            this.addOutput(`<span class="terminal-info">Exemplo: js console.log('Hello World')</span>`);
            return;
        }

        try {
            // Capture console.log output
            const originalLog = console.log;
            const logs = [];
            console.log = (...args) => {
                logs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
            };

            // Execute JavaScript code
            const result = eval(code);
            
            // Restore console.log
            console.log = originalLog;

            // Display console output
            logs.forEach(log => {
                this.addOutput(`<span class="terminal-result">📝 ${this.escapeHtml(log)}</span>`);
            });

            // Display result if it's not undefined
            if (result !== undefined) {
                const displayResult = typeof result === 'object' 
                    ? JSON.stringify(result, null, 2) 
                    : String(result);
                this.addOutput(`<span class="terminal-success">📦 ${this.escapeHtml(displayResult)}</span>`);
            }
        } catch (error) {
            this.addOutput(`<span class="terminal-error">❌ Erro JavaScript: ${error.message}</span>`);
        }
    }

    calculator(expression) {
        if (!expression.trim()) {
            this.addOutput(`<span class="terminal-error">calc: expressão matemática necessária</span>`);
            this.addOutput(`<span class="terminal-info">Exemplo: calc 2 + 2 * 3</span>`);
            return;
        }

        try {
            // Clean expression and validate
            const cleanExpr = expression.replace(/[^0-9+\-*/().\s]/g, '');
            if (cleanExpr !== expression) {
                this.addOutput(`<span class="terminal-error">calc: caracteres inválidos na expressão</span>`);
                return;
            }

            const result = eval(cleanExpr);
            this.addOutput(`<span class="terminal-success">🔢 ${expression} = ${result}</span>`);
        } catch (error) {
            this.addOutput(`<span class="terminal-error">❌ Erro na expressão: ${error.message}</span>`);
        }
    }

    makeDirectory(name) {
        if (!name) {
            this.addOutput(`<span class="terminal-error">mkdir: nome do diretório necessário</span>`);
            return;
        }

        const currentDir = this.fileSystem[this.currentPath];
        if (currentDir && !currentDir.directories.includes(name)) {
            currentDir.directories.push(name);
            // Create entry in filesystem
            this.fileSystem[this.currentPath + '/' + name] = {
                type: 'directory',
                files: [],
                directories: []
            };
            this.addOutput(`<span class="terminal-success">📁 Diretório '${name}' criado</span>`);
        } else {
            this.addOutput(`<span class="terminal-error">Diretório '${name}' já existe</span>`);
        }
    }

    createFile(name) {
        if (!name) {
            this.addOutput(`<span class="terminal-error">touch: nome do arquivo necessário</span>`);
            return;
        }

        const currentDir = this.fileSystem[this.currentPath];
        if (currentDir && !currentDir.files.includes(name)) {
            currentDir.files.push(name);
            this.addOutput(`<span class="terminal-success">📄 Arquivo '${name}' criado</span>`);
        } else {
            this.addOutput(`<span class="terminal-error">Arquivo '${name}' já existe</span>`);
        }
    }

    // Terminal management methods
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        const terminal = document.getElementById('terminal-container');
        const toggleBtn = document.getElementById('terminal-toggle');
        
        if (terminal) {
            terminal.classList.remove('hidden');
            this.isOpen = true;
            
            if (toggleBtn) {
                toggleBtn.classList.add('active');
            }
            
            // Focus on input
            setTimeout(() => {
                this.focusInput();
            }, 100);
            
            console.log('📱 Terminal aberto');
        }
    }

    close() {
        const terminal = document.getElementById('terminal-container');
        const toggleBtn = document.getElementById('terminal-toggle');
        
        if (terminal) {
            terminal.classList.add('hidden');
            this.isOpen = false;
            
            if (toggleBtn) {
                toggleBtn.classList.remove('active');
            }
            
            console.log('📱 Terminal fechado');
        }
    }

    // Utility methods
    addToHistory(command) {
        this.commandHistory.unshift(command);
        if (this.commandHistory.length > 50) {
            this.commandHistory.pop();
        }
    }

    navigateHistory(direction) {
        const input = document.getElementById('terminal-input');
        if (!input || this.commandHistory.length === 0) return;

        if (direction === -1) { // Up
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
            }
        } else { // Down
            if (this.historyIndex > -1) {
                this.historyIndex--;
            }
        }

        if (this.historyIndex >= 0) {
            input.value = this.commandHistory[this.historyIndex];
        } else {
            input.value = '';
        }
    }

    addOutput(html) {
        const output = document.getElementById('terminal-output');
        if (output) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = html;
            output.appendChild(line);
        }
    }

    scrollToBottom() {
        const output = document.getElementById('terminal-output');
        if (output) {
            output.scrollTop = output.scrollHeight;
        }
    }

    focusInput() {
        const input = document.getElementById('terminal-input');
        if (input) {
            input.focus();
        }
    }

    updatePrompt() {
        const prompt = document.querySelector('.terminal-prompt');
        if (prompt) {
            prompt.textContent = `user@dev-guide:${this.getShortPath()}$`;
        }
    }

    getShortPath() {
        return this.currentPath.replace('/home/dev-guide', '~');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Method to execute command from test buttons
    executeTestCommand(command) {
        this.open();
        
        setTimeout(() => {
            const input = document.getElementById('terminal-input');
            if (input) {
                input.value = command;
                
                setTimeout(() => {
                    this.processCommand();
                }, 200);
            }
        }, 300);
    }
}

// Navigation Setup
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const overviewCards = document.querySelectorAll('.overview-card');
    
    // Navigation menu
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const section = e.target.getAttribute('data-section');
            if (section) {
                navigateToSection(section);
                updateActiveNavItem(e.target);
            }
        });
    });
    
    // Overview cards
    overviewCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const section = e.currentTarget.getAttribute('data-section');
            if (section) {
                navigateToSection(section);
                updateActiveNavItemBySection(section);
            }
        });
    });
    
    console.log('🧭 Navegação configurada');
}

function setupSectionSwitching() {
    // Initially show all section
    navigateToSection('all');
    console.log('📄 Seções configuradas');
}

function setupTestButtons() {
    const testButtons = document.querySelectorAll('.test-btn');
    
    testButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const command = e.target.getAttribute('data-command');
            if (command && terminal) {
                terminal.executeTestCommand(command);
                showToast(`💻 Executando: ${command}`);
            }
        });
    });
    
    console.log(`🧪 ${testButtons.length} botões de teste configurados`);
}

function navigateToSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        console.log(`📍 Navegando para seção: ${sectionId}`);
    }
}

function updateActiveNavItem(activeItem) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

function updateActiveNavItemBySection(sectionId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const itemSection = item.getAttribute('data-section');
        item.classList.toggle('active', itemSection === sectionId);
    });
}

// Toast notification system
function showToast(message) {
    let toast = document.getElementById('toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.id = 'toast';
        toast.innerHTML = '<span class="toast-message"></span>';
        document.body.appendChild(toast);
    }
    
    const messageElement = toast.querySelector('.toast-message');
    if (messageElement) {
        messageElement.textContent = message;
    }
    
    // Show toast
    toast.classList.remove('show');
    toast.offsetHeight; // Force reflow
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Erro na aplicação:', e.error);
});

// Log initialization complete
console.log('🎯 app.js carregado completamente');