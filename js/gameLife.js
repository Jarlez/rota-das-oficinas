// Constantes para o tamanho do tabuleiro
const width = 10;
const heigh = 10;

// Variáveis globais
let board = [];
let interval;

// Função para criar o tabuleiro
function createBoard() {
    const boardDiv = document.getElementById("board");

    for (let i = 0; i < heigh; i++) {
        const line = [];
        const lineDiv = document.createElement("tr");

        for (let j = 0; j < width; j++) {
            const cell = {
                alive: false,
                nextState: false
            };
            line.push(cell);

            const cellDiv = document.createElement("td");
            cellDiv.addEventListener("click", () => toggleCell(i, j));

            lineDiv.appendChild(cellDiv);
        }

        board.push(line);
        boardDiv.appendChild(lineDiv);
    }
}

// Função para alternar o estado da célula
function toggleCell(i, j) {
   board[i][j].alive = !board[i][j].alive;
    updateCell(i, j);
}

// Função para atualizar a cor da célula
function updateCell(i, j) {
    const cellDiv = document.getElementById("board").rows[i].cells[j];
    cellDiv.style.backgroundColor = board[i][j].alive ? "black" : "white";
}

// Função para atualizar o tabuleiro
function updateBoard() {
    const nextBoard = [];

    for (let i = 0; i < heigh; i++) {
        const line = [];

        for (let j = 0; j < width; j++) {
            const cell = board[i][j];
            const numberOfLiveNeighbors = countLiveNeighbors(i, j);

            if (cell.alive) {
                cell.nextState = numberOfLiveNeighbors === 2 || numberOfLiveNeighbors === 3;
            } else {
                cell.nextState = numberOfLiveNeighbors === 3;
            }

            line.push(cell);
        }

        nextBoard.push(line);
    }

    board = nextBoard;

    for (let i = 0; i < heigh; i++) {
        for (let j = 0; j < width; j++) {
            board[i][j].alive = board[i][j].nextState;
            updateCell(i, j);
        }
    }
}

// Função para contar os vizinhos vivos
function countLiveNeighbors(i, j) {
    let numberOfLiveNeighbors = 0;

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue;

            const neighborI = i + x;
            const neighborJ = j + y;

            if (neighborI >= 0 && neighborI < heigh && neighborJ >= 0 && neighborJ < width) {
                if (board[neighborI][neighborJ].alive) {
                    numberOfLiveNeighbors++;
                }
            }
        }
    }

    return numberOfLiveNeighbors;
}

// Função para start o jogo
function startGame() {
    interval = setInterval(updateBoard, 500);
    showStatus("Em andamento");
}

// Função para parar o jogo
function stopGame() {
    clearInterval(interval);
    showStatus("Jogo parado");
}

// Função para apagar o tabuleiro
function deleteBoard() {
    for (let i = 0; i < heigh; i++) {
        for (let j = 0; j < width; j++) {
            board[i][j].alive = false;
            updateCell(i, j);
        }
    }
    showStatus("Tabuleiro apagado");
}

// Função para mostrar o status
function showStatus(message) {
    const statusDiv = document.getElementById("status");
    statusDiv.innerText = message;
}

// Função de inicialização
function start() {
    createBoard();
}

// Chamar a função de inicialização
start();