import {Component} from "react";
import {Form, Container, Button, Spinner, DropdownButton, Dropdown} from 'react-bootstrap'
import {Ticket, ticketService} from "../network/services";

import {Row, Column, Card} from "../widgets";
import {Alert} from "../widgets";
import React, {useDebugValue} from 'react';

export class SubmitForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            headline : null,
            content : null,
            priority : 1,
            category : null,
            picture : null,
            post_date : '2019-03-15 01:01:22',
            author : null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value,});
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        if(this.submitTicket()) alert("Thank you for your submission!");
        window.location.reload();

    }

    render() {
        return(
                            <div className="card col-lg4 m-4 bg-dark text-white">
                                <div className="card-header"><h2 className="card-title">Submit a new ticket</h2></div>
                                <div class="m-4">
                        <Form onSubmit = {this.handleSubmit}>
                            <Form.Group>
                                <Form.Control type="number" name="headline" placeholder="Enter order number" value={this.state.headline} onChange={this.handleInputChange} />
                                <Form.Text> This field only accept numbers </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="text" maxLength="255" name="author" placeholder="Enter your name" value={this.state.author} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control as="textarea" rows="6" name="content" maxLength="255" placeholder="Please briefly explain the issue" value={this.state.content} onChange={this.handleInputChange} />
                                <Form.Text> Max length: 255 </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="text" maxLength="255"  name="category" placeholder="Describe the category" value={this.state.category} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="text" maxLength="255" name="picture" placeholder="Please enter a picture URL" value={this.state.picture} onChange={this.handleInputChange} />
                            </Form.Group>

                            <div class="card-footer">
                            <Form.Group>
                                <Button disabled={this.headline=null} variant="btn btn-primary btn-lg" type="submit"> Submit </Button>
                            </Form.Group>
                            </div>

                        </Form>
                                </div>
                            </div>


        )
    }

    submitTicket() {
        ticketService.createTicket(this.state);


        }

}