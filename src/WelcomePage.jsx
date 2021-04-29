import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import './MyCss.css'
function WelcomePage(props) {
    const [Name, setName] = useState(props.Name)
    const swalAlert=()=> {
        Swal.fire({
            icon: 'error',
            title: 'Name Error',
            text: 'Please Enter Your Name!',
        })
        props.ChangeIfNull(false);
    }
    return (
        <div className="Welcome">
            <h1>Welcome To Memory Game</h1>
            <InputGroup className="mb-3 inputName" >
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Name:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    onChange={(e) => { setName(e.target.value) }}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            {props.IfNull ? swalAlert() : null}
            <Button className="btn" onClick={() => { props.StartGame(Name) }} variant="primary">Start</Button>
        </div>
    )

}

export default withRouter(WelcomePage)
