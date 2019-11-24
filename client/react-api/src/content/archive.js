// @flow
import {Component} from "react-simplified";
import {ticketService} from "../network/services";
import {Button, Table} from "react-bootstrap";

import React from 'react';

export class ArchiveList extends Component {


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
                        <th>Recover</th>
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
                                <Button variant="warning" onClick={() => this.recoverTicket(ticket)}>Recover ticket</Button>
                            </td>
                            <td>{ticket.ticket_id}</td>
                            <td>{ticket.author}</td>
                            <td>{ticket.headline}</td>
                            <td>{ticket.content}</td>
                            <td>{this.convertDateTimeFromSQL(ticket.post_date)}</td>
                            <td>
                                <Button variant="danger" onClick={() =>this.archiveTicket(ticket)}>Delete forever</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        )
    }

    recoverTicket(ticket){
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

    componentDidMount() {
        ticketService.getTickets(3).then(res => {
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
            "priority": 3,
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
        return 'Ticket posted: ' + hour + ':' + minute + ', ' + day + '.' + month + '.' + year;
    }

}

