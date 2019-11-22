// @flow
import {ticketService} from "../network/services";
import {Modal,Button, Card, ListGroup, Container, Table, Row,Col, Form} from "react-bootstrap";
import React from 'react';

export class Comments extends React.Component<> {

    constructor(props) {
        super(props);
        this.state = {
            comments : [],
        };
    }

    render() {
        if (this.state.comments.length==0) return (<div></div>);
        return(
            <div>
                <Card className="m-4 bg-dark text-white" >

                    <Card.Title>
                        Comment window
                    </Card.Title>
                {this.state.comments.map(comment =>(
                    <Card.Body>
                    <p>Belongs to: {comment.ticket_id}</p>
                    <p>Comments: {comment.content}</p>
                    </Card.Body>
                ))}
                </Card>
            </div>

        )}

    componentDidMount(){
        console.log("this is the ID in component mount " + this.props.id);
        ticketService
            .getComments(this.props.id)
            .then(res => {
                const comments = res.data;
                this.setState({comments})
            });
    }
}