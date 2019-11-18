import {Component} from "react-simplified";
import {Ticket, ticketService} from "../network/services";
import {Button} from "react-bootstrap";
import {Alert} from "../widgets";
import React from 'react';

export class Faq extends Component {
    render() {
        return(
            <div className="card col-lg4 m-4 bg-dark text-white">
                <div className="card-header"><h2 className="card-title">Frequently asked questions</h2></div>
                <div className="m-4">

                    <h5>When will I get my order?</h5>
                    <p>The pre order status can be found on the product page</p>

                    <h5>When will I get my order?</h5>
                    <p>The pre order status can be found on the product page</p>

                    <h5>When will I get my order?</h5>
                    <p>The pre order status can be found on the product page</p>

                    <h5>When will I get my order?</h5>
                    <p>The pre order status can be found on the product page</p>

                    <h5>When will I get my order?</h5>
                    <p>The pre order status can be found on the product page</p>

                    <h5>When will I get my order?</h5>
                    <p>The pre order status can be found on the product page</p>

                    <h5>When will I get my order?</h5>
                    <p>The pre order status can be found on the product page</p>

                </div>
            </div>
        )
    }

}