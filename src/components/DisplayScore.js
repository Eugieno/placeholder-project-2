import { useState,useEffect } from "react";
import HighScoreBoard from "./HighScoreBoard";
import useLocalStorageState from 'use-local-storage-state'

export default function DisplayScore ({score, arrayLength, restartGame}) {
    const [userName, updateUserName] = useState();
    const [showLeaderboard, setLeaderboard] = useState(false);
    const [nameAndScore, setNameAndScore] = useLocalStorageState("topScores", {
        defaultValue: []
    });
    const [scoreList, setScoreList] = useState()
    
    console.log(score)

    const onClick = (e) => {       
        updateUserName("")
        setNameAndScore([...nameAndScore, [userName, score]])
       
        // control for navigating to highscore board
        setLeaderboard(!showLeaderboard)
        console.log(!showLeaderboard)

        
    }

    window.onstorage = () => {
        // When local storage changes, dump the list to
        // the console.
        console.log(JSON.parse(window.localStorage.getItem("topScores")));
        setScoreList(JSON.parse(window.localStorage.getItem("topScores")));
        console.log(scoreList)
      };

    useEffect(()=> {
        // setScoreList(scoreList)
        console.log("Highscore list initialised!")


    },[nameAndScore])
    
    
return (
    // Using boolean - single page compliant
    <div>
        {showLeaderboard ? (<HighScoreBoard scoreList={scoreList}/>) : 
            <div className="final-result">
            <h1>Final Result</h1>
            <h2> You scored {score} out of {arrayLength} - {(score/arrayLength)*100}%</h2>
            <button style={{marginRight:20,marginBottom:10}} onClick={restartGame} className="restart-game">Restart Game</button>
            <button style={{marginRight:20}} onClick={onClick} className="restart-game">Save to scoreboard</button>
            <div style={{margin:15}}>
            <label ><em >Enter your name: </em></label>
                <input value ={userName}className="name-entry" onChange={(e)=> updateUserName(e.target.value)} placeholder="Name"></input>
            </div>
        </div>
        }
    </div>)




}
