/* eslint-disable no-console */

const gameBoard = (() => {
    /** @type {Array} array representation of gameBoard */
    const gameBoardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    /**
     *  Make a move on gameBoard
     *  @param {number} index - index to move on
     *  @param {char} symbol - symbol (X or O) to place at index
     *  @returns {boolean} true if valid move, else false
     */
    const makeMove = (index, symbol) => {
        if (gameBoardArray[index] === " ") {
            gameBoardArray[index] = symbol;
            return true;
        }

        return false;
    };

    /**
     * Reset gameBoard
     */
    const resetBoard = () => {
        gameBoardArray.splice(
            0,
            gameBoardArray.length,
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " "
        );
    };

    /**
     * Print ASCII representation of gameBoard to console
     * Used for debugging
     */
    const printBoard = () => {
        console.log(
            ` ${gameBoardArray[0]} | ${gameBoardArray[1]} | ${gameBoardArray[2]} `
        );
        console.log(`---+---+---`);
        console.log(
            ` ${gameBoardArray[3]} | ${gameBoardArray[4]} | ${gameBoardArray[5]} `
        );
        console.log(`---+---+---`);
        console.log(
            ` ${gameBoardArray[6]} | ${gameBoardArray[7]} | ${gameBoardArray[8]} `
        );
    };

    /**
     * Check if the game has been won or tied
     * @returns {char} 'X' if player X has won
     *                 'O' if player O has won
     *                 'T' if game tied
     *                 'N' if no winner or tie
     */
    const checkWin = () => {
        // Check if winner exists
        if (
            gameBoardArray[0] !== " " &&
            gameBoardArray[0] === gameBoardArray[1] &&
            gameBoardArray[1] === gameBoardArray[2]
        ) {
            return gameBoardArray[0];
        }
        if (
            gameBoardArray[3] !== " " &&
            gameBoardArray[3] === gameBoardArray[4] &&
            gameBoardArray[4] === gameBoardArray[5]
        ) {
            return gameBoardArray[3];
        }
        if (
            gameBoardArray[6] !== " " &&
            gameBoardArray[6] === gameBoardArray[7] &&
            gameBoardArray[7] === gameBoardArray[8]
        ) {
            return gameBoardArray[6];
        }
        if (
            gameBoardArray[0] !== " " &&
            gameBoardArray[0] === gameBoardArray[3] &&
            gameBoardArray[3] === gameBoardArray[6]
        ) {
            return gameBoardArray[0];
        }
        if (
            gameBoardArray[1] !== " " &&
            gameBoardArray[1] === gameBoardArray[4] &&
            gameBoardArray[4] === gameBoardArray[7]
        ) {
            return gameBoardArray[1];
        }
        if (
            gameBoardArray[2] !== " " &&
            gameBoardArray[2] === gameBoardArray[5] &&
            gameBoardArray[5] === gameBoardArray[8]
        ) {
            return gameBoardArray[2];
        }
        if (
            gameBoardArray[0] !== " " &&
            gameBoardArray[0] === gameBoardArray[4] &&
            gameBoardArray[4] === gameBoardArray[8]
        ) {
            return gameBoardArray[0];
        }
        if (
            gameBoardArray[6] !== " " &&
            gameBoardArray[6] === gameBoardArray[4] &&
            gameBoardArray[4] === gameBoardArray[2]
        ) {
            return gameBoardArray[6];
        }

        // If no winner, check if tie exists
        for (let i = 0; i < gameBoardArray.length; i += 1) {
            // If a square remains empty, no tie
            if (gameBoardArray[i] === " ") {
                return "N";
            }
        }
        // If all squares filled but no winner, tie
        return "T";
    };

    return { gameBoardArray, makeMove, resetBoard, printBoard, checkWin };
})();

const GameAI = (name, symbol) => {
    /** @type {string} Game AI's name */
    this.name = name;
    /** @type {char} Game AI's symbol (X or O) */
    this.symbol = symbol;

    // Helper function to get random int between min (inclusive) and max (exclusive)
    function getRandomInt(min, max) {
        this.min = Math.ceil(min);
        this.max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Make an AI move
     * Current algorithm is random play
     * @param {char} symbol - symbol for the AI to use in its play
     * @returns {boolean} - true if valid move, else false
     */
    const makeAIMove = () => {
        // Array of empty indices on the board
        const emptyIndexArray = [];

        // Fill emptyIndexArray
        for (let i = 0; i < gameBoard.gameBoardArray.length; i += 1) {
            if (gameBoard.gameBoardArray[i] === " ") {
                emptyIndexArray.push(i);
            }
        }

        // Choose random index from emptyIndexArray
        const index = getRandomInt(0, emptyIndexArray.length);

        // Make move
        return gameBoard.makeMove(emptyIndexArray[index], symbol);
    };

    return { name, symbol, makeAIMove };
};

const Player = (name, symbol) => {
    /** @type {string} Player's name */

    this.name = name;
    /** @type {char} Player's symbol (X or O) */
    this.symbol = symbol;

    /**
     * Make a player move
     * @param {number} index - Index for the player to play on
     * @returns {boolean} True if valid move, else false
     */
    const makePlayerMove = (index) => gameBoard.makeMove(index, symbol);

    return { name, symbol, makePlayerMove };
};

const gameController = (() => {
    /** @type {boolean} Whether the game is single-player or not */
    let isSinglePlayer;
    /** @type {Player} Player 1 of the game */
    let playerOne;
    /** @type {Player || gameAI} Player 2 of the game */
    let playerTwo;
    /** @type {String} Game AI's name */
    const gameAIName = "TTT_AI_V1";

    return { isSinglePlayer, playerOne, playerTwo, gameAIName };
})();

const displayController = (() => {
    // Main header for site
    const mainHeader = document.getElementById("main-header");
    // Start page div
    const startPage = document.getElementById("start-page");
    // One player name entry page div
    const onePlayerNameEntryPage = document.getElementById(
        "one-player-name-entry-page"
    );
    // Two player name entry page div
    const twoPlayerNameEntryPage = document.getElementById(
        "two-player-name-entry-page"
    );
    // Game board page div
    const gameBoardPage = document.getElementById("game-board-page");

    const onePlayerButton =
        document.getElementsByClassName("one-player-button")[0];
    const twoPlayerButton =
        document.getElementsByClassName("two-player-button")[0];

    const onePlayerSubmit = document.getElementById("one-player-submit");
    const onePlayerNameEntryForm = document.getElementById(
        "one-player-name-entry-form"
    );

    const twoPlayerSubmit = document.getElementById("two-player-submit");
    const twoPlayerNameEntryForm = document.getElementById(
        "two-player-name-entry-form"
    );

    const playerOneNameDisplay = document.getElementById("player-one-name");
    const playerTwoNameDisplay = document.getElementById("player-two-name");

    mainHeader.style.display = "none";
    onePlayerNameEntryPage.style.display = "none";
    twoPlayerNameEntryPage.style.display = "none";
    gameBoardPage.style.display = "none";

    onePlayerButton.addEventListener("click", () => {
        mainHeader.style.display = "";
        startPage.style.display = "none";
        onePlayerNameEntryPage.style.display = "";

        gameController.isSinglePlayer = true;
    });

    twoPlayerButton.addEventListener("click", () => {
        mainHeader.style.display = "";
        startPage.style.display = "none";
        twoPlayerNameEntryPage.style.display = "";

        gameController.isSinglePlayer = false;
    });

    onePlayerNameEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();

        onePlayerNameEntryPage.style.display = "none";
        twoPlayerNameEntryPage.style.display = "none";
        gameBoardPage.style.display = "";

        gameController.playerOne = Player(
            onePlayerNameEntryForm.elements["one-player-name-input"].value,
            "X"
        );

        gameController.playerTwo = GameAI(gameController.gameAIName, "O");

        playerOneNameDisplay.textContent = gameController.playerOne.name;
        console.log(gameController.playerTwo.name);
        playerTwoNameDisplay.textContent = gameController.playerTwo.name;
    });

    twoPlayerNameEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();

        onePlayerNameEntryPage.style.display = "none";
        twoPlayerNameEntryPage.style.display = "none";
        gameBoardPage.style.display = "";

        gameController.playerOne = Player(
            twoPlayerNameEntryForm.elements["two-player-name-input-1"].value,
            "X"
        );

        gameController.playerTwo = Player(
            twoPlayerNameEntryForm.elements["two-player-name-input-2"].value,
            "O"
        );

        playerOneNameDisplay.textContent = gameController.playerOne.name;
        playerTwoNameDisplay.textContent = gameController.playerTwo.name;
    });

    const gameBoardSquares =
        document.getElementsByClassName("game-board-square");

    for (let i = 0; i < gameBoardSquares.length; i += 1) {
        gameBoardSquares[i].addEventListener("click", () => {
            gameBoardSquares[i].style.backgroundColor = "red";
        });
    }

    // gameBoardPage.style.opacity = "5%";
})();
