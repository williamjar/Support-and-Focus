// @flow

import React from 'react';
import {Form, Button} from 'react-bootstrap'
import {ticketService} from "../network/services";


export class SubmitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headline: '',
            content: '',
            priority: 2,
            picture: '',
            post_date: '2000-01-01 00:00:00',
            email: '',
            group_id: 1,
            author: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(name + " verdi: " + value);

        this.setState({[name]: value,});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.submitTicket();
    }

    render() {
        return (
            <div className="card col-lg4 m-4 bg-dark text-white">
                <div className="card-header"><h2 className="card-title">Submit a new ticket</h2></div>
                <div class="m-4">
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Group>
                            <Form.Control type="number" name="headline" placeholder="Enter order number"
                                          value={this.state.headline} onChange={this.handleInputChange}/>
                            <Form.Text> This field only accept numbers </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="text" maxLength="255" name="author" placeholder="Enter your name"
                                          value={this.state.author} onChange={this.handleInputChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control as="textarea" rows="6" cols="40" name="content" maxLength="255"
                                          placeholder="Please briefly explain the issue" value={this.state.content}
                                          onChange={this.handleInputChange}/>
                            <Form.Text> Max length: 255 </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="email" name="category" placeholder="Enter your email"
                                          value={this.state.category} onChange={this.handleInputChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="text" maxLength="255" name="picture"
                                          placeholder="Please enter a picture URL" value={this.state.picture}
                                          onChange={this.handleInputChange}/>
                        </Form.Group>

                        <div class="card-footer">
                            <Form.Group>
                                <Button variant="btn btn-primary btn-lg" type="submit"> Submit </Button>
                            </Form.Group>
                        </div>

                    </Form>
                </div>
            </div>
        )
    }

    submitTicket() {
        let json: {} = {
            "headline": this.state.headline,
            "content": this.state.content,
            "priority": this.state.priority,
            "picture": this.state.picture,
            "post_date": this.state.post_date,
            "group_id": this.state.group_id,
            "author": this.state.author
        };


        ticketService.createTicket(json).then(res =>
            alert("Thank you, you will hear from us shortly.")
            );

        window.location.reload();

    }

}