import React from "react"

export default function ScoreBoard(props){
    return(
        <div className="score-container">
            <div className="rolls">
                <h1>Rolls: </h1>
                <h1 className="count">{props.amountOfRolls}</h1>
            </div>
            <div className="rolls">
                <h1>Time: </h1>
                <h1 className="count">
                    <span>{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}:</span>
                    <span>{("0" + ((props.time / 10) % 100 )).slice(-2)}</span>
                </h1>
            </div>
            <div className="rolls">
                <h1>Score:</h1>
                <h1 className="count">{props.score}</h1>
            </div>
        </div>
    )
}