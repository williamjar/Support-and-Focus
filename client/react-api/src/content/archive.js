// @flow
import {Component} from "react-simplified";
import {Archive, Ticket, ticketService} from "../network/services";
import {Button, ListGroup, Table, Row, Card, Container} from "react-bootstrap";
import {Alert} from "../widgets";
import React from 'react';

export class ArchiveList extends Component {
    archive: Archive[] = [];


    render() {
        return (
            <div className="card m-4 bg-dark text-white">
                <Table responsive={"sm"} striped bordered hover variant="dark" max-width={20}>
                    <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Customer</th>
                        <th>Order Number</th>
                        <th>Content</th>
                        <th>Archived date</th>
                        <th>Reopen</th>
                        <th>Delete (GDPR)</th>
                    </tr>
                    </thead>
                    <tbody>
                {this.archive.map(ticket => (
                        <tr>
                            <td>{ticket.ticket_id}</td>
                            <td>{ticket.author}</td>
                            <td>{ticket.headline}</td>
                            <td>{this.shortenString(ticket.content, 20)}</td>
                            <td>{this.convertDateTimeFromSQL(ticket.post_date)}</td>
                            <td>
                                <Button variant="warning">Reopen ticket</Button>
                            </td>
                            <td>
                                <Button variant="danger">Delete forever</Button>
                            </td>
                        </tr>




                ))}
                    </tbody>
                </Table>
            </div>

        )
    }

    shortenString(text, chars){
        if(text == null || text == " ") return "no content";
        var str = text.slice(0, chars);
        return str+"...";
    }
    mounted() {
        ticketService
            .getArchive()
            .then(archive => (this.archive = archive))
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


        return 'Time archived: ' + hour + ':' + minute + ', ' + day + '.' + month + '.' + year;

    }


    //lag en json her fra infoen
}
