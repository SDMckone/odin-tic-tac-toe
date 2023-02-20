// Game board
const Gameboard = (() => {
    const gameBoardArray = ["", "", "", "", "", "", "", "", ""];

    const makeMove = (index, symbol) => {
        gameBoardArray[index] = symbol;
        return true;
    };

    const resetBoard = () => {
        gameBoardArray.splice(0, gameBoardArray.length, ..."");
    };
})();
