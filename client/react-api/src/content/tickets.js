// @flow

import {ticketService} from "../network/services";
import {Button, Card, Collapse, ListGroup, Container, Table, Navbar, Row,Col, Form} from "react-bootstrap";
import React from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {Comments} from "./comment";
import { createHashHistory } from 'history';
const history = createHashHistory();


export class FocusedTicket extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            tickets : [],
        };
    }

    deFocusTicket(ticket) {
        window.location.reload();
        let json: {} = {
            "ticket_id": ticket.ticket_id,
            "headline": ticket.headline,
            "content": ticket.content,
            "priority": 2,
            "picture": ticket.picture,
            "post_date": ticket.post_date,
            "email":ticket.email,
            "group_id":ticket.group_id,
            "author": ticket.author
        };
        ticketService.updateTicketPriority(json);
    }

    render() {
        if(this.state.tickets.length < 1){
                return (
                    <div className="card-deck">
                    <div className="col-lg-4">
                    <Card className="m-4" style={{ width: '21rem' }}>
                        <Button variant="outline-dark" disabled={true}><br></br></Button>
                        <div className="card-header"><h5
                            className="card-title text-center"><span className="text-primary">Focus</span> to place a ticket here</h5>
                        </div>
                        <div className="card-body">
                            <img className="card-img-top img-fluid" />
                            <p className="card-subtitle m-2"><span className="text-primary">Focus</span> a ticket from the list below to move it here, and get access to additional support tools</p>
                            <br></br>
                            <br></br>
                        </div>

                        <div className="card-footer">
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                            <br></br>
                            <br></br>
                    </Card>
                    </div>
                    </div>
                )
        };
        return (
            <div class="card-deck">
                {this.state.tickets.map(ticket =>(


                    <div key={ticket.ticket_id} className="col-lg-4">
                            <Card className="m-4 bg-dark text-white" >
                                <Button variant="outline-primary" onClick={() => this.deFocusTicket(ticket)}>Defocus</Button>
                                    <div className="card-header"><h5
                                        className="card-title">{"Order number: " + ticket.headline}</h5>
                                    </div>
                                <div className="card-body">
                                    <img className="card-img-top img-fluid" alt={ticket.headline} src={ticket.picture}/>
                                    <p className="card-subtitle m-2">{ticket.content}</p>
                                </div>
                                <div className="card-footer">
                                    <p className="card-text">Ticket number: {ticket.ticket_id}</p>
                                    <p className="card-subtitle mb-2 text-light">Customer: {ticket.author}</p>
                                    <p className="card-subtitle mb-2"><Button variant="link">{}Contact</Button></p>
                                    <p className="card-text"><small className="text-muted">{this.convertDateTimeFromSQL(ticket.post_date)}</small></p>
                                </div>
                                <Button variant="danger mb-4 mt-2 mr-3 ml-3" onClick={() => this.archiveTicket(ticket)}>Mark as solved</Button>
                                <Button variant="info mt-2 mr-3 ml-3" >Comments</Button>
                                <br></br>
                            </Card>

                        <div className={"Row"}>
                            <Comments id={ticket.ticket_id}/>
                        </div>

                        </div>



                ))}
            </div>
        )}

    componentDidMount() {
        ticketService
            .getTickets(1).then(res => {
            const tickets = res.data;
            this.setState({tickets})
            });
    }



    sendEmail(ticket){
        let url = ticket.category;
        let win = window.open('mailto:'+url, '_blank');
    }

    convertDateTimeFromSQL(date) {
        var str = date.split('-');
        var year = str[0];
        var month = str[1];
        var rest = str[2];
        var time = rest.split('T');
        var day = time[0];
        var restTime = time[1].split(':');
        var hour = restTime[0];
        var minute = restTime[1];
        return 'Time posted: ' + hour + ':' + minute + ', ' + day + '.' + month + '.' + year;

    }

    archiveTicket(ticket) {
        window.location.reload();
        let json: {} = {
            "ticket_id": ticket.ticket_id,
            "headline": ticket.headline,
            "content": ticket.content,
            "priority": ticket.priority,
            "category": ticket.category,
            "picture": ticket.picture,
            "post_date": ticket.post_date,
            "author": ticket.author
        };
        ticketService.solveTicket(json);
    }
}

export class TicketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets : [],
        };
    }

    render() {
        return (
                <div className="card m-4 bg-dark text-white">
                <Table responsive={"sm"} striped bordered hover variant="dark" max-width={20}>
                    <thead>
                    <tr>
                        <th>Focus</th>
                        <th>Ticket ID</th>
                        <th>Customer</th>
                        <th>Order Number</th>
                        <th>Content</th>
                        <th>Submitted</th>
                        <th>Archive</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tickets.map(ticket => (
                        <tr>
                            <td>
                                <Button variant="primary" onClick={() => this.focusTicket(ticket)}>Focus</Button>
                            </td>
                            <td>{ticket.ticket_id}</td>
                            <td>{ticket.author}</td>
                            <td>{ticket.headline}</td>
                            <td>{ticket.content}</td>
                            <td>{this.convertDateTimeFromSQL(ticket.post_date)}</td>
                            <td>
                                <Button variant="danger" onClick={() =>this.archiveTicket(ticket)}>Mark as solved</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </div>
        )
    }

    focusTicket(ticket){
        window.location.reload();
        let json: {} = {
            "ticket_id": ticket.ticket_id,
            "headline": ticket.headline,
            "content": ticket.content,
            "priority": 1,
            "picture": ticket.picture,
            "post_date": ticket.post_date,
            "email":ticket.email,
            "group_id":ticket.group_id,
            "author": ticket.author
        };
        ticketService.updateTicketPriority(json);
    }

    componentDidMount() {
        ticketService.getTickets(2).then(res => {
            const tickets = res.data;
            this.setState({tickets})
        });
    }

    archiveTicket(ticket) {
        window.location.reload();
        let json: {} = {
            "ticket_id": ticket.ticket_id,
            "headline": ticket.headline,
            "content": ticket.content,
            "priority": ticket.priority,
            "category": ticket.category,
            "picture": ticket.picture,
            "post_date": ticket.post_date,
            "author": ticket.author
        };
        ticketService.solveTicket(json);
    }

    convertDateTimeFromSQL(date) {
        var str = date.split('-');
        var year = str[0];
        var month = str[1];
        var rest = str[2];
        var time = rest.split('T');
        var day = time[0];
        var restTime = time[1].split(':');
        var hour = restTime[0];
        var minute = restTime[1];
        return 'Time posted: ' + hour + ':' + minute + ', ' + day + '.' + month + '.' + year;

    }
}






