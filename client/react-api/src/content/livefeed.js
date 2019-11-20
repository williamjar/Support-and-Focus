import {Ticket, ticketService} from "../network/services";
import {Component} from "react-simplified";
import {Alert, Col, Row, CardColumns} from "react-bootstrap";
import React from 'react'

export class LiveFeed extends Component{
    tickets : Ticket[] = [];
    value : number = 60;

    render(){
        return(
            <div>
                {this.tickets.map(ticket => (
            <div className="rollingNews">
            <div>
                <p>Here comes a livefeed {ticket.headline}</p>
            </div>
            </div>
                ))}
            </div>
        )
    }

    //<div id="rollText">{ticketService.tickets.map(e => `${e.headline} /`)} </div>
    mounted() : void{

    }
}
