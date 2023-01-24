import React, { useContext } from 'react'
import { ThemeContext } from '../Theme/ThemeContext'
import { PieceProps } from './types'
import "./styles.css"

const Piece: React.FC<PieceProps> = ({ num }) => {
    const { theme } = useContext(ThemeContext)
    return (
        num === 0 ?
            <div className={`piece piece_0 ${theme}-theme`}></div>
            :
            <div className={`piece piece_${num} ${theme}-theme`}> {num}</div>
    )

}
export default Piece