//Styles
import './App.css'

//Components
import StartGame from './components/StartGame'
import Game from './components/Game'
import GameOver from './components/GameOver'

//React
import { useState, useEffect, useCallback } from 'react'

// Data
import { wordsList } from './data/words'

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

const guessesNumber = 5

function App() {
  const [gameStage, setGamestage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setpickedWord] = useState("")
  const [pickedCategory, setpickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesNumber)
  const [score, setScore] = useState(0)

  const topickWordandCategory = useCallback(() => {

    //Pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)

    //Pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word)

    return { word, category }
  }, [words])
  //Start the game
  const startGame = useCallback(() => {
    clearLetterStates()
    const { word, category } = topickWordandCategory()


    //Create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((letters) => letters.toLowerCase())

    console.log(word, category)
    console.log(wordLetters)

    //Set Stages
    setpickedCategory(category)
    setpickedWord(word)
    setLetters(wordLetters)


    setGamestage(stages[1].name)
  }, [topickWordandCategory]);

  //Game Over
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((atualGuessedLetters) => [
        ...atualGuessedLetters,
        normalizedLetter
      ])
    } else {
      // Adiciona esta linha para decrementar as tentativas
      setGuesses(prevGuesses => prevGuesses - 1)
      setWrongLetters((atualWrongLetters) => [
        ...atualWrongLetters,
        normalizedLetter
      ])
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if (guesses <= 0) {
      //reset all stages
      setGamestage(stages[2].name)

      clearLetterStates()
    }
  }, [guesses])

  //Win condicion
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]

    if (guessedLetters.length === uniqueLetters.length) {
      //Score
      setScore((actualScore) => actualScore += 100)
      //Restart game with new words
      startGame()
    }
  }, [guessedLetters, letters, startGame])

  //Retry
  const retryGame = () => {
    setScore(0)
    setGuesses(guessesNumber)
    setGamestage(stages[0].name)
  }
  return (
    <div className='App'>
      {gameStage === 'start' && <StartGame startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameStage === 'end' && <GameOver retryGame={retryGame} score={score} />}
    </div>
  )
}

export default App
