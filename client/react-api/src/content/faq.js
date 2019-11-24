// @flow
import {Component} from "react-simplified";
import React from 'react';
import {Col} from "react-bootstrap";

/*
Generell info-side. Skal kunne endres via admin-panel(ikke laget enda).
 */

export class Faq extends Component {
    render() : void{
        return(
            <Col sm={8}>
            <div className="card col-lg4 m-4 bg-dark text-white">
                <div className="card-header"><h2 className="card-title">Frequently asked questions</h2></div>
                <div className="m-4">

                    <h5>When will I get my order?</h5>
                    <p>The pre order status can be found on the product page</p>

                    <h5>Where can i find the product page?</h5>
                    <p>You can find the product page on the product page. </p>

                    <h5>When is the next pre order?</h5>
                    <p>The next pre order is December 2019</p>

                    <h5>What is the difference between Klippe and Fjell?</h5>
                    <p>Fjell is a more premium offering with chamfered edges and more case material.</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.</p>
                </div>
            </div>
            </Col>
        )
    }
}