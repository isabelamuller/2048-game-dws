import React from 'react'
import Button from "../Button"
import { GameOverMessageProps } from "./types"
import './styles.css'

const GameOverMessage: React.FC<GameOverMessageProps> = ({ handleClick }) => {

    return (
        <div className='game-over_container'>
            <h2 className='game-over_message'>Game Over</h2>
            <Button handleClick={handleClick}>New Game</Button>
        </div>
    )
}
export default GameOverMessage;