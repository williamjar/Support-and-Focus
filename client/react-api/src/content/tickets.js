// @flow

import {Component} from "react";
import {Ticket, ticketService} from "../network/services";
import {Button, Card, Container} from "react-bootstrap";
import {Alert} from "../widgets";
import React from 'react';

export class TicketList extends Component{
    tickets: Ticket[] = [];



    render() {
        return (
                <div class="card-deck">
                    {this.tickets.map(ticket => (
                        <div className="col-lg-4">
                        <div class="card m-4 bg-dark text-white">
                            <div className="card-header"><h5 className="card-title">{"Order number: " + ticket.headline}</h5></div>
                            <div class="card-body">
                                <img className="card-img-top" src={ticket.picture}/>
                                <p className="card-subtitle m-2" >{ticket.content}</p>
                            </div>
                            <div className="card-footer">
                                <p className="card-text">Ticket number: {ticket.ticket_id}</p>
                                <p className="card-subtitle mb-2 text-light">Customer: {ticket.author}</p>
                                <p className="card-text"><small className="text-muted">{this.convertDateTimeFromSQL(ticket.post_date)}</small></p>
                            </div>

                            <Button variant="danger m-4">Contact customer now</Button>
                            <Button variant="success m-4" onClick={() => this.archiveTicket(ticket)}>{}Mark as solved</Button>
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


    archiveTicket(ticket) {
        let json : {} = {
            "ticket_id":ticket.ticket_id,
            "headline":ticket.headline,
            "content":ticket.content,
            "priority":ticket.priority,
            "category":ticket.category,
            "picture":ticket.picture,
            "post_date":ticket.post_date,
            "author":ticket.author
        };

        ticketService.deleteTicket(json);
        window.location.reload();
    }

    convertDateTimeFromSQL(date){
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

