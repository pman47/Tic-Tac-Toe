const gameWonScenarios = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function checkIfWon (board, moveNo) {
    const wonScenariosOnMove = gameWonScenarios.filter(gameScenario=>{
        return gameScenario.includes(moveNo)
    })

    for ( scenario of wonScenariosOnMove) {
        if (board[scenario[0]] !== 0 && board[scenario[0]] === board[scenario[1]] && board[scenario[1]] === board[scenario[2]]) {
            return true
        }
    }
    return false
}

function checkIfBoardCompleted (board) {
    return board.includes(0) ? false : true
}

module.exports = { checkIfWon, checkIfBoardCompleted }