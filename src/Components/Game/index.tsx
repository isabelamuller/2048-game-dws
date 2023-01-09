import { useContext, useEffect, useState } from "react"
import { useEvent } from "../../utils/keyDownEvent"
import { handleSwipeDown, handleSwipeLeft, handleSwipeRight, handleSwipeUp } from "../../utils/movements"
import Board from "../Board"
import GameOverMessage from "../GameOverMessage"
import Header from "../Header"
import './styles.css'
import { ThemeContext } from "../Theme/ThemeContext"

const Game = () => {
    const UP_ARROW = 38;
    const DOWN_ARROW = 40;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

    const [gameState, setGameState] = useState(new Array(16).fill(0));
    const [dummy, setDummy] = useState<number[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [score, setScore] = useState<number>(0);
    let gameStateObject;

    const initialize = () => {
        let newGrid = [...gameState]
        newGrid = addNumber(newGrid)
        newGrid = addNumber(newGrid)
        setGameState(newGrid)
    }

    const resetGame = () => {
        let emptyGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        emptyGrid = addNumber(emptyGrid)
        emptyGrid = addNumber(emptyGrid)
        setGameState(emptyGrid)
        const localScore = localStorage.getItem('highestScore');
        const highestScore = Number(localScore) > score ? `${localScore}` : `${score}`
        localStorage.setItem('highestScore', highestScore)
        setScore(0);
        setGameOver(false)
    }

    const isGameOver = () => {
        setDummy(handleSwipeLeft(gameState).newArray)
        if (JSON.stringify(gameState) !== JSON.stringify(dummy)) {
            return false
        }

        setDummy(handleSwipeDown(gameState).newArray)
        if (JSON.stringify(gameState) !== JSON.stringify(dummy)) {
            return false
        }

        setDummy(handleSwipeRight(gameState).newArray)
        if (JSON.stringify(gameState) !== JSON.stringify(dummy)) {
            return false
        }

        setDummy(handleSwipeUp(gameState).newArray)
        if (JSON.stringify(gameState) !== JSON.stringify(dummy)) {
            return false
        }

        return true
    }

    const addNumber = (currentGrid: number[]) => {
        let newGrid = [...currentGrid];
        let added = false;
        let left_spaces: number[] = [];

        newGrid.forEach((value, index) => {
            if (value === 0) {
                left_spaces.push(index);
            }
        })

        if (left_spaces.length === 0) {
            if (isGameOver()) {
                setGameOver(true);
            }
            return newGrid;
        }


        while (!added) {
            let position = Math.floor(Math.random() * left_spaces.length)
            newGrid[left_spaces[position]] = Math.random() > 0.5 ? 2 : 4
            added = true
        }
        return newGrid;
    }


    const handleKeyDown = (event: KeyboardEvent) => {
        let newGrid = [...gameState];
        switch (event.keyCode) {
            case UP_ARROW:
                gameStateObject = handleSwipeUp(gameState)
                newGrid = gameStateObject.newArray
                setScore(gameStateObject.score + score)
                break;
            case DOWN_ARROW:
                gameStateObject = handleSwipeDown(gameState)
                newGrid = gameStateObject.newArray
                setScore(gameStateObject.score + score)
                break;
            case LEFT_ARROW:
                gameStateObject = handleSwipeLeft(gameState)
                newGrid = gameStateObject.newArray
                setScore(gameStateObject.score + score)
                break;
            case RIGHT_ARROW:
                gameStateObject = handleSwipeRight(gameState)
                newGrid = gameStateObject.newArray
                setScore(gameStateObject.score + score)
                break;
            default:
                break;
        }
        newGrid = addNumber(newGrid)
        setGameState(newGrid)
    }

    useEffect(() => {
        initialize()
    }, [])


    useEvent("keydown", handleKeyDown)

    return (
        <>
            <div className={`game ${theme}-theme`}>
                <div className="score-wrapper">
                    <div className={`current-score ${theme}-theme`}>
                        <h1>score</h1>
                        <div className="score">{score}</div>
                    </div>
                    <div className={`highest-score ${theme}-theme`}>
                        <h1>best</h1>
                        <div className="score">{localStorage.getItem('highestScore')}</div>
                    </div>
                </div>
                <Header />
                {gameOver && <GameOverMessage handleClick={resetGame} />}
                <div>
                </div>
                <Board currentState={gameState} />
            </div>
        </>
    )

}


export default Game