// @flow

import {Component} from "react-simplified";
import {Ticket, ticketService} from "../network/services";
import {Button, Card, ListGroup, Container, Table} from "react-bootstrap";
import {Alert} from "../widgets";
import React from 'react';

export class HighlightedTicket extends Component {
    tickets: Ticket[] = [];

    render() {
        return (
            <div class="card-deck">
                {this.tickets.map(ticket => (
                    <div className="col-lg-4">
                        <div class="card m-4 bg-dark text-white">
                            <div className="card-header"><h5
                                className="card-title">{"Order number: " + ticket.headline}</h5></div>
                            <div class="card-body">
                                <img className="card-img-top" src={ticket.picture}/>
                                <p className="card-subtitle m-2">{ticket.content}</p>
                            </div>
                            <div className="card-footer">
                                <p className="card-text">Ticket number: {ticket.ticket_id}</p>
                                <p className="card-subtitle mb-2 text-light">Customer: {ticket.author}</p>
                                <p className="card-text"><small
                                    className="text-muted">{this.convertDateTimeFromSQL(ticket.post_date)}</small></p>
                            </div>
                            <Button variant="danger m-4">Contact customer now</Button>
                            <Button variant="success m-4" onClick={() => this.archiveTicket(ticket)}>{}Mark as
                                solved</Button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    mounted() {
        ticketService
            .getTickets()
            .then(tickets => (this.tickets = tickets))
            .catch((error: Error) => Alert.danger(error.message));

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

export class TicketList extends Component {
    tickets: Ticket[] = [];

    render() {
        return (
            <Container className="m-auto">
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
                                <Button variant="primary">Focus</Button>
                            </td>
                            <td>{ticket.ticket_id}</td>
                            <td>{ticket.author}</td>
                            <td>{ticket.headline}</td>
                            <td>{ticket.content}</td>
                            <td>{this.convertDateTimeFromSQL(ticket.post_date)}</td>

                            <td>
                                <Button variant="success">Mark as solved</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        )
    }

    mounted() {
        ticketService
            .getTickets()
            .then(tickets => (this.tickets = tickets))
            .catch((error: Error) => Alert.danger(error.message));

    }


    archiveTicket(ticket) {
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

    //lag en json her fra infoen
}

