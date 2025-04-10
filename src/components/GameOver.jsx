import './GameOver.css'

const GameOver = ({ retryGame, score }) => {
  return (
    <div>
      <h2>Fim de jogo!</h2>
      <h2>Sua pontuação foi de: <span>{score}</span></h2>
      <button onClick={retryGame}>Reiniciar</button>
    </div>
  )
}

export default GameOver
