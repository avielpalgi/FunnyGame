import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './MyCss.css';
function SideBar(props) {
    const [list, setList] = useState([])

    useEffect(() => {
    }, [])
    
    const OrderListScores = () => {
        return (<ul className="ulList">{props.ListOfScores ?
            props.ListOfScores.map(score => <li>Score: {score.Score},Time: {score.Time}</li>)
            : null} </ul>)
    }

    return (
        <Col xs="4" className="sidebar">
            <h2>Name: {props.Name}</h2>
            <h2>Current Score: {props.CurrentScore}</h2>
            <h2>Best Scores: {props.BestScore}</h2>
            <h2>List of Scores:</h2>
            {OrderListScores()}
        </Col>
    )
}

export default SideBar
