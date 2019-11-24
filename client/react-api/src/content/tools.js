//@ flow

import {ticketService} from "../network/services";
import {Row, Card, ListGroup, Button} from "react-bootstrap";
import React from 'react'
import Col from "react-bootstrap/Col";

/*
    Denne filen har ulike maler for ulike komponenter som kan gjenbrukes
 */

export class LiveFeed extends React.Component {
    intervalID = 0;

    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
        };
    }

    render(): html {

        if (this.state.tickets.length === 0) return (
            <div><Row> <ListGroup.Item className={"m-2"} variant={"primary"}>No new tickets</ListGroup.Item> </Row>
            </div>)
        return (
            <div>
                <ListGroup horizontal variant={"flush"}>
                    <Row>
                        <ListGroup.Item className={"m-2"} variant={"danger"}>Latest tickets:</ListGroup.Item>
                        {this.state.tickets.map(ticket => (
                            <div>
                                <ListGroup.Item onClick={() => this.focusTicket(ticket)} className={"m-2"}
                                                variant={"dark"}>

                                    {this.convertDateTimeFromSQL(ticket.post_date)}"{ticket.content.substring(0, 25)}..."
                                    by {ticket.author}

                                </ListGroup.Item>
                            </div>
                        ))}
                    </Row>
                </ListGroup>
            </div>

        )
    }

    componentDidMount(): void {
        this.updateTickets();
        this.startUpdater();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
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

    startUpdater(): void {
        this.intervalID = setInterval(() => {
                this.updateTickets()
            }, 5000
        );
    }

    updateTickets(): void {
        ticketService
            .getAllTickets().then(res => {
            const tickets = res.data;
            this.setState({tickets})
        });
    }

    convertDateTimeFromSQL(date) {
        var str = date.split('-');
        var rest = str[2];
        var time = rest.split('T');
        var restTime = time[1].split(':');
        var hour = restTime[0];
        var minute = restTime[1];
        return hour + ':' + minute + ': ';
    }
}

//Grouper is a filter for all the tickets, to sort them into their respective category, based on their group. This will be implemented later.
export class Grouper extends React.Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            groups: [],
        };
    }

    render() {

        return (
            <div>
                <Row>
                    {this.state.groups.map(group => (
                        <Col sm={1}>
                            <div>
                                <Button variant={"light"}>{group.group_name}</Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }


    componentDidMount(): void {
        ticketService
            .getGroups()
            .then(res => {
                const groups = res.data;
                this.setState({groups})
            });
    }

}


export class ToolBar extends React.Component {

    render() {

        return (
            <div>
                <Card className="m-4 bg-dark text-white">
                    <div
                        className="card-header"><h5 className="card-title">Toolbar</h5>
                        <LiveFeed></LiveFeed>
                    </div>
                </Card>

            </div>
        )
    }
}