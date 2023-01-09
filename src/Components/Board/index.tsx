import React, { useContext } from 'react'
import Piece from '../Piece'
import { BoardProps } from './types'
import './styles.css'
import { ThemeContext } from '../Theme/ThemeContext'

const Board: React.FC<BoardProps> = ({ currentState }) => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return (
        <>
             <div className={`board ${theme}-theme`}>
                {currentState.map((digit, index) =>
                    <Piece num={digit} key={`piece_${index}`} />
                )}
            </div>
        </>
    )
}
export default Board