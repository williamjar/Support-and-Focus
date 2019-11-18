// @flow
import {Component} from "react-simplified";
import {Archive, Ticket, ticketService} from "../network/services";
import {Button, Card, Container} from "react-bootstrap";
import {Alert} from "../widgets";
import React from 'react';

export class ArchiveList extends Component{
    archive: Archive[] = [];



    render() {
        return (
            <div class="card-deck">
                {this.archive.map(ticket => (
                    <div className="col-lg-2">
                        <div class="card m-1 bg-dark text-white">
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
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    mounted() {
        ticketService
            .getArchive()
            .then(archive => (this.archive = archive))
            .catch((error: Error) => Alert.danger(error.message));
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



        return 'Time archived: ' + hour + ':' + minute + ', ' + day + '.' + month + '.' + year;

    }

    //lag en json her fra infoen
}

