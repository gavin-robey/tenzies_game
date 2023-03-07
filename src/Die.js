import React from "react"

export default function Die(props){
    return (
        <div className="container">
            {props.isHeld ? <h1 onClick={props.onHold} className="die-clicked">{props.number}</h1> : <h1 onClick={props.onHold} className="die">{props.number}</h1>}
        </div>
    )
}