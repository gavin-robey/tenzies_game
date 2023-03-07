import './App.css';
import Die from "./Die.js"
import React from "react"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import ScoreBoard from './ScoreBoard';

export default function App() {
  const [randomNumbers, setRandomNumbers] = React.useState(allNewDice())
  const [isWin, setWin] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [score, setScore] = React.useState(1006)
  const [time, setTime ] = React.useState(0)

  // A player wins if all items are clicked and are the same
  React.useEffect(()=>{
    const allIsClicked = randomNumbers.every(item => item.isHeld)
    const allSameNumber = randomNumbers.every(item => item.value === randomNumbers[0].value)
    if(allIsClicked && allSameNumber){
      setWin(true)
    }
  }, [randomNumbers])

  React.useEffect(()=>{
    setScore(prevScore => prevScore - 2)
  }, [randomNumbers])

  React.useEffect(()=>{
    setScore(prevScore => prevScore - 10)
  }, [rolls])

  React.useEffect(()=>{
    let interval = null
    if(!isWin){
      interval = setInterval(()=>{
        setTime(prevTime => prevTime + 10)
      }, 10) 
    }else{
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [!isWin])
  
  React.useEffect(()=>{
    setScore(prevScore => prevScore -2)
  }, [time % 1000 === 0])

  // Creates a completely new random dice pile 
  function allNewDice(){
    const randomArray = []
    for(let i = 0; i < 10; i++){
      randomArray.push(updateDice())
    }
    return randomArray
  }

  //Updates an indiviual die with a random value
  function updateDice(){
    return{
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  //Rolls the dice that arent selected
  function rollDice(){
    setRandomNumbers(prevDice => prevDice.map(item =>{
      if(!item.isHeld){
        return updateDice()
      }else{
        return item
      }
    }))

    setRolls(prevRoll => prevRoll + 1)
  }

  function reload(){
    document.location.reload()
  }

  //Selects and updates a selected die to state
  function holdDice(id){
    setRandomNumbers(oldDice => oldDice.map(item => {
      if(item.id === id){
        return{
          ...item,
          isHeld: !item.isHeld
        }
      }else{
        return item
      }
    }))
  }

  // The map of the die components
  const dice = randomNumbers.map(item => <Die  onHold={()=> holdDice(item.id)} key={item.id} number={item.value} isHeld={item.isHeld}/>)

  return (
    <div className='element-container'>
      <main>
        {isWin && <Confetti/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dice}
        </div>
        <button className="roll-dice" onClick={isWin ? reload: rollDice}>{isWin ? "New Game" : "Roll" }</button>
      </main>
      <ScoreBoard amountOfRolls={rolls} score={score} time={time}/>
    </div>
  )
}

