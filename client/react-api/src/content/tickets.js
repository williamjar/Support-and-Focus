// @flow

/*
Denne filen har både fokuserte "tickets" og listen med resterende "tickets".
 */

import {ticketService} from "../network/services";
import {Button, Card, Table, Row, Col} from "react-bootstrap";
import React from 'react';
import {Comments, CommentSubmit} from "./comment";
import {FromDatetime, PlaceholderTicket} from "../widgets";

export class FocusedTicket extends React.Component<{}> {
    state: {
        tickets: ?[],
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            tickets: [],
        };

    }

    deFocusTicket(ticket: Object): void {
        window.location.reload();
        let json: {} = {
            "ticket_id": ticket.ticket_id,
            "headline": ticket.headline,
            "content": ticket.content,
            "priority": 2,
            "picture": ticket.picture,
            "post_date": ticket.post_date,
            "email": ticket.email,
            "group_id": ticket.group_id,
            "author": ticket.author
        };
        ticketService.updateTicketPriority(json);
    }

    render(): void {

        if (this.state.tickets.length < 1) return (<PlaceholderTicket/>);

        return (
            <div>
                <Row>
                    {this.state.tickets.map(ticket => (
                        <div className={"col-lg-4"}>
                            <Card className="m-4 bg-dark text-white">
                                <Button variant="outline-info"
                                        onClick={() => this.deFocusTicket(ticket)}>Defocus</Button>
                                <div className="card-header"><h5
                                    className="card-title">{ticket.headline}</h5>
                                </div>
                                <div className="card-body">
                                    <img className="card-img-top img-fluid" alt={ticket.headline} src={ticket.picture}/>
                                    <p className="card-subtitle m-2">{ticket.content}</p>
                                </div>
                                <div className="card-footer">
                                    <p className="card-text">Ticket number: {ticket.ticket_id}</p>
                                    <p className="card-subtitle mb-2 text-light">Customer: {ticket.author}</p>
                                    <p className="card-subtitle mb-2"><Button variant="link" onClick={() => this.sendEmail(ticket)}>Contact</Button></p>

                                    <Row>
                                        <Col sm={3}>
                                            <p className={"text-white"}>Ticket posted:</p>
                                        </Col>
                                        <Col>
                                            <p className={"text-muted"}><FromDatetime post_date={ticket.post_date}/></p>
                                        </Col>
                                    </Row>

                                    <Comments id={ticket.ticket_id}/>
                                    <br/>
                                    <CommentSubmit id={ticket.ticket_id}/>

                                </div>
                                <Button variant="outline-danger" onClick={() => this.archiveTicket(ticket)}>Mark as
                                    solved</Button>
                            </Card>
                        </div>
                    ))}
                </Row>
            </div>

        )
    }

    componentDidMount(): void {
        ticketService
            .getTickets(1).then(res => {
            const tickets = res.data;
            this.setState({tickets})
        });
    }

    sendEmail(ticket: object) {
        let url = ticket.email;
        window.open('mailto:' + url, '_blank');
    }

    archiveTicket(ticket: Object) {
        window.location.reload();
        let json: {} = {
            "ticket_id": ticket.ticket_id,
            "headline": ticket.headline,
            "content": ticket.content,
            "priority": 3,
            "category": ticket.category,
            "picture": ticket.picture,
            "post_date": ticket.post_date,
            "author": ticket.author
        };
        ticketService.solveTicket(json);
    }
}

export class TicketList extends React.Component<{}> {
    state: {
        tickets: ?[],
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            tickets: [],
        };
    }

    render() {
        return (
            <div className="card m-4 bg-dark text-white">
                <Table responsive={"sm"} striped bordered hover variant="dark" max-width={20}>
                    <thead>
                    <tr>
                        <th><Button variant={"success"} onClick={() => this.refresh()}>Refresh list</Button></th>
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
                                <Button variant="info" onClick={() => this.focusTicket(ticket)}>Focus</Button>
                            </td>
                            <td>{ticket.ticket_id}</td>
                            <td>{ticket.author}</td>
                            <td>{ticket.headline}</td>
                            <td>{ticket.content}</td>
                            <td><FromDatetime post_date={ticket.post_date}/></td>
                            <td>
                                <Button variant="danger" onClick={() => this.archiveTicket(ticket)}>Mark as
                                    solved</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        )
    }

    focusTicket(ticket: Object) {
        window.location.reload();
        let json: {} = {
            "ticket_id": ticket.ticket_id,
            "headline": ticket.headline,
            "content": ticket.content,
            "priority": 1,
            "picture": ticket.picture,
            "post_date": ticket.post_date,
            "email": ticket.email,
            "group_id": ticket.group_id,
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

    refresh() {
        window.location.reload();
    }

    archiveTicket(ticket: Object) {
        window.location.reload();
        let json: {} = {
            "ticket_id": ticket.ticket_id,
            "headline": ticket.headline,
            "content": ticket.content,
            "priority": 3,
            "category": ticket.category,
            "picture": ticket.picture,
            "post_date": ticket.post_date,
            "author": ticket.author
        };
        ticketService.solveTicket(json);
    }

}






