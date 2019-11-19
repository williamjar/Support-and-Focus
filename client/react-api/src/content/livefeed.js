import {Ticket, ticketService} from "../network/services";
import {Component} from "react-simplified";
import {Alert, Col, Row, CardColumns} from "react-bootstrap";
import React from 'react'

export class LiveFeed extends Component{

    value : number = 60;

    render(){
        return(
            <div>
            <div className="rollingNews">
            <div>
                <p>Here comes a livefeed</p>
            </div>
            </div>
            </div>
        )
    }

    //<div id="rollText">{ticketService.tickets.map(e => `${e.headline} /`)} </div>
    mounted() : void{
        setInterval(a => this.animateLiveFeed(),15);
        ticketService.getTickets(2);
    }

    animateLiveFeed() : void{
        if(this.value<-70){
            this.value = 60;
        }



    }
}
