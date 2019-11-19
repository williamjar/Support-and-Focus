// @flow

import {Component} from "react-simplified";
import {Ticket, ticketService} from "../network/services";
import {Button, Card, ListGroup, Container, Table, Row,Col, Form} from "react-bootstrap";
import {Alert} from "../widgets";
import React from 'react';

export class HighlightedTicket extends Component {
    tickets: Ticket[] = [];
    render() {
        if (this.tickets === undefined || this.tickets.length == 0) {
            return(
                <div className="card m-4 bg-dark text-white align-items-center">
                    <div className="card-body">
                        <br></br>
                        <h4 class={"text-center"}>Find a ticket to <span className={"text-primary"}>focus</span> on below!</h4>
                        <br></br>
                        <p class={"text-center"}>When you <span class={"text-primary"}>focus</span> a ticket, it will appear here with easy accessibility to support tools.</p>
                        <br></br>
                    </div>
                    <br></br>
                </div>
            )
        } else {
        return (
            <div class="card-deck">
                {this.tickets.map(ticket => (
                    <div className="col-lg-4">
                        <div class="card m-4 bg-dark text-white">
                            <Button variant="outline-primary" onClick={() => this.deFocusTicket(ticket)}>Defocus</Button>
                            <div className="card-header"><h5
                                className="card-title">{"Order number: " + ticket.headline}</h5>
                            </div>
                            <div class="card-body">
                                <img className="card-img-top img-fluid" alt={ticket.headline} src={ticket.picture}/>
                                <p className="card-subtitle m-2">{ticket.content}</p>
                            </div>
                            <div className="card-footer">
                                <p className="card-text">Ticket number: {ticket.ticket_id}</p>
                                <p className="card-subtitle mb-2 text-light">Customer: {ticket.author}</p>
                                <p className="card-subtitle mb-2"><Button variant="link" onClick={() => this.sendEmail(ticket)}>{}Contact</Button></p>
                                <p className="card-text"><small
                                    className="text-muted">{this.convertDateTimeFromSQL(ticket.post_date)}</small></p>

                            </div>
                                <Button variant="info mt-2 mr-3 ml-3">Comment</Button>
                                <Button variant="danger mb-4 mt-2 mr-3 ml-3" onClick={() => this.archiveTicket(ticket)}>{}Mark as solved</Button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    }

    deFocusTicket(ticket){
        window.location.reload();
        let json: {} = {
            "ticket_id": ticket.ticket_id,
            "headline": ticket.headline,
            "content": ticket.content,
            "priority": 2,
            "category": ticket.category,
            "picture": ticket.picture,
            "post_date": ticket.post_date,
            "author": ticket.author
        };
        ticketService.updateTicketPriority(json);

    }

    mounted() {
        ticketService
            .getTickets(1)
            .then(tickets => (this.tickets = tickets))
            .catch((error: Error) => Alert.danger(error.message));

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
        console.log(ticket.post_date);
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

        ticketService.deleteTicket(json);
        window.location.reload();
    }
}

export class TicketList extends Component {
    tickets: Ticket[] = [];
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
                    {this.tickets.map(ticket => (
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
                                <Button variant="danger">Mark as solved</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </div>

        )
    }

    focusTicket(ticket){
        let json: {} = {
            "ticket_id": ticket.ticket_id,
            "headline": ticket.headline,
            "content": ticket.content,
            "priority": 1,
            "category": ticket.category,
            "picture": ticket.picture,
            "post_date": ticket.post_date,
            "author": ticket.author
        };
        window.location.reload();
        ticketService.updateTicketPriority(json);


    }

    mounted() : void{
        ticketService
            .getTickets(2).then(tickets => (this.tickets = tickets))


            .catch((error: Error) => Alert.danger(error.message));

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
        ticketService.deleteTicket(json);
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


