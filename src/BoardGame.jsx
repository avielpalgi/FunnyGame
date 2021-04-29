import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MyCss.css'
import SideBar from './SideBar';

function BoardGame(props) {
    const [Name, setName] = useState(props.Name)
    const [GameOver, setGameOver] = useState(false)
    const [BestScore, setBestScore] = useState(0)
    const [CurrentScore, setCurrentScore] = useState(0)
    const [Bulbs, setBulbs] = useState([
        { id: 0, class: "none0" }, { id: 1, class: "none1" }, { id: 2, class: "none2" },
        { id: 3, class: "none3" }, { id: 4, class: "none4" }, { id: 5, class: "none5" }
    ])
    const [BulbsInGame, setBulbsInGame] = useState([])
    const [SelectedBulbs, setSelectedBulbs] = useState([]);
    const [Num, setNum] = useState(0)
    const [ListOfScores, setListOfScores] = useState([])
    const NewGame = () => {
        setGameOver(false);
        setCurrentScore(0);
        setBulbs([
            { id: 0, class: "none0" }, { id: 1, class: "none1" }, { id: 2, class: "none2" },
            { id: 3, class: "none3" }, { id: 4, class: "none4" }, { id: 5, class: "none5" }
        ])
        setBulbsInGame([]);
        setSelectedBulbs([]);
        setNum(0);
        setTimeout(() => {
            GameAction();
        }, 1000);
    }

    useEffect(() => {
        if (localStorage.getItem('ListScores') !== null) {
            let list = JSON.parse(localStorage.getItem('ListScores'));
            setListOfScores(list);
        }
        GameAction();

    }, [])

    function GameAction() {
        console.log("Start");
        setNum(0);
        setSelectedBulbs([]);
        let temp = BulbsInGame;
        let tempMinus = [];
        let rndBulb = Bulbs[Math.floor(Math.random() * Bulbs.length)];
        temp.push(rndBulb)
        setBulbsInGame(temp);
        for (let i = 0; i < temp.length; i++) {
            doSetTimeout(i, temp[i]);
        }
    }

    function doSetTimeout(i, num) {
        setTimeout(function () {
            console.log("num", num);
            let tempBulbTsoShow = [...Bulbs];
            tempBulbTsoShow[num.id] = { id: num.id, class: "play" + num.id }
            setBulbs(tempBulbTsoShow);
            setTimeout(() => {
                let tempBulbTsoShow = [...Bulbs];
                tempBulbTsoShow[num.id] = { id: num.id, class: "none" + num.id }
                setBulbs(tempBulbTsoShow);
            }, 1000);
        }, 1500 * (i + 1));
    }

    const ClickAction = (e) => {
        let bool = false
        let temp = SelectedBulbs;
        temp.push(e)
        setSelectedBulbs(temp)
        let lastSelect = SelectedBulbs[Num]
        let lastBulbInGame = BulbsInGame[Num]

        { lastSelect.id == lastBulbInGame.id ? UpScore() : bool = true }

        setNum(Num + 1);
        if (Num + 1 == BulbsInGame.length && !bool) {
            GameAction();
        }
        if (bool) {
            GameOverFunc();
        }
    }
    function UpScore() {
        setCurrentScore(CurrentScore + 10);
        
    }
    function GameOverFunc() {
        if(BestScore<CurrentScore){setBestScore(CurrentScore);}
        let time = new Date();
        let AddToList = {
            Score:CurrentScore,
            Time: time.toLocaleTimeString()
        }
        let tempList = [...ListOfScores];
        tempList.push(AddToList);
        setListOfScores(tempList);
        localStorage.setItem('ListScores',JSON.stringify(tempList));
        setBulbs([
            { id: 0, class: "none0" }, { id: 1, class: "none1" }, { id: 2, class: "none2" },
            { id: 3, class: "none3" }, { id: 4, class: "none4" }, { id: 5, class: "none5" }
        ])
        setBulbsInGame([]);
        setSelectedBulbs([]);
        setNum(0);
        setGameOver(true);
        
    }

    function ShowBulbs() {
        return Bulbs.map(bulb => <Col className={bulb.class} id={"bulb" + bulb.id} onClick={() => { ClickAction(bulb) }}><FontAwesomeIcon icon={faCircle} /></Col>)
    }

    return (
        <Container fluid>
            <Row className="Header">
                <h1>Game Board</h1>
            </Row>
            {!GameOver ?
                <Row className="RowGame">
                    <SideBar Name={Name} CurrentScore={CurrentScore} BestScore={BestScore} ListOfScores={ListOfScores} />
                    <Col xs="8" className="gameboard">
                        <Row className="bulbs">
                            {ShowBulbs()}
                        </Row>
                    </Col>
                </Row > : <Row>
                    <Col className="GameOver">
                        <h2>Game Over</h2>
                        <h3>Your Score is: {CurrentScore}</h3>
                        <Button className="btn" onClick={()=>{NewGame()}}>Play a New Game</Button>
                    </Col>

                </Row>}
        </Container>
    )
}

export default withRouter(BoardGame)
