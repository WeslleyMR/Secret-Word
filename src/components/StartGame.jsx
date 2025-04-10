import "./StartGame.css";

const StartGame = ({startGame}) => {
  return (
    <div className="HomeStart">
        <h1>Secret Word</h1>
        <p>Aperte o botão para começar o jogo!</p>
        <button onClick={startGame}>Jogar</button>
    </div>
  )
}

export default StartGame
