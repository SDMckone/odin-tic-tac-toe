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
            (gameBoardArray[0] === gameBoardArray[1]) === gameBoardArray[2]
        ) {
            return gameBoardArray[0];
        }
        if (
            gameBoardArray[3] !== " " &&
            (gameBoardArray[3] === gameBoardArray[4]) === gameBoardArray[5]
        ) {
            return gameBoardArray[3];
        }
        if (
            gameBoardArray[6] !== " " &&
            (gameBoardArray[6] === gameBoardArray[7]) === gameBoardArray[8]
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
            (gameBoardArray[1] === gameBoardArray[4]) === gameBoardArray[7]
        ) {
            return gameBoardArray[1];
        }
        if (
            gameBoardArray[2] !== " " &&
            (gameBoardArray[2] === gameBoardArray[5]) === gameBoardArray[8]
        ) {
            return gameBoardArray[2];
        }
        if (
            gameBoardArray[0] !== " " &&
            (gameBoardArray[0] === gameBoardArray[4]) === gameBoardArray[8]
        ) {
            return gameBoardArray[0];
        }
        if (
            gameBoardArray[6] !== " " &&
            (gameBoardArray[6] === gameBoardArray[4]) === gameBoardArray[2]
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

    return { makeMove, resetBoard, printBoard, checkWin, gameBoardArray };
})();
