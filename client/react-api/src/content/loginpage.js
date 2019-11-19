import React from "react";
import {Redirect} from 'react-dom';

import {Button, Form, Container} from "react-bootstrap";


export class PasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            passoword: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    render() {
        if (this.state.password === "kebab") {
            return <Redirect to="/tickets" />
        } else{
        return (
            <Container>
                <div className="card col-lg4 m-4 bg-dark text-white">
                    <div class="m-4">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Control type="password" maxLength="255" name="password"
                                              placeholder="Enter admin password" value={this.state.password}
                                              onChange={this.handleInputChange}/>
                            </Form.Group>

                        </Form>
                    </div>
                </div>
            </Container>

        )}
    }


}