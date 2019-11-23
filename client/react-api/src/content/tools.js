import {Ticket, ticketService} from "../network/services";
import {Component} from "react-simplified";
import {Alert, Col, Row, CardColumns, breakpoint, Card, ListGroup, Button} from "react-bootstrap";
import React from 'react'
import {Comments, CommentSubmit} from "./comment";

export class LiveFeed extends React.Component{
    intervalID = 0;
    constructor(props) {
        super(props);
        this.state = {
            tickets : [],
        };

    }

    render() : html{

            return(
                <div>
                    <ListGroup horizontal variant={"flush"} >
                        <Row>
                            <ListGroup.Item className={"m-2"} variant={"danger"}>Latest tickets:</ListGroup.Item>
                        {this.state.tickets.map(ticket =>(
                                <ListGroup.Item className={"m-2"} variant={"dark"} >{this.convertDateTimeFromSQL(ticket.post_date)}{ ticket.content.substring(0, 15)}</ListGroup.Item>
                        ))}
                        </Row>
                    </ListGroup>
                </div>

            )
    }

    componentDidMount() : void{
        this.updateTickets();
        this.startUpdater();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    startUpdater() : void {
        this.intervalID = setInterval(() => {
            this.updateTickets()}, 50000
        );
    }



    updateTickets() : void {
        ticketService
            .getAllTickets().then(res => {
            const tickets = res.data;
            this.setState({tickets})
        });
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
        return hour + ':' + minute + ': ';
    }
}




export class ToolBar extends React.Component {

    render(){

        return(
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