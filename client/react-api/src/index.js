// @flow

import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import React from 'react'
import {Component} from 'react-simplified';
import {Alert, NavBar} from './widgets';
import {TicketList, FocusedTicket} from './content/tickets';
import {ToolBar} from "./content/tools";
import {ArchiveList} from './content/archive';
import {Faq} from './content/faq'
import {SubmitForm} from './content/submit';
import Row from "react-bootstrap/Row";

/*
    Denne filen har skallet rundt alle de andre komponentene. Denne filen bruker react-simplified.( Takk Eidheim ! ).
 */

//menu for navigation
class Menu extends Component {
    render() {
        return (
            <div>
                <img src="/smallogo.png" alt="Tickets Focus logo" />
            <NavBar>
                <NavBar.Link to="/">Customer page</NavBar.Link>
                <NavBar.Link to="/tickets">Tickets</NavBar.Link>
                <NavBar.Link to="/archive">Archive</NavBar.Link>
            </NavBar>
            </div>
        );
    }
}

// footer
class Footer extends Component {
    render() {
        return (
            <div class="card">
                <p class="text-muted">
                    Copyright Mekanisk AS 2019
                </p>

            </div>
        )
    }
}

//main tree of components
const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div className="bg-light">
                <Alert/>
                <Menu/>
                <Row>
                <Route exact path="/" component={SubmitForm}/>
                <Route exact path="/" component={Faq}/>
                </Row>
                <Route path="/tickets" component={ToolBar}/>
                <Route path="/tickets" component={FocusedTicket}/>
                <Route path="/tickets" component={TicketList}/>
                <Route path="/archive" component={ArchiveList}/>
                <Footer/>
            </div>
        </HashRouter>,
        root
    );





