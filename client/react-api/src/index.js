// @flow
import ReactDOM from 'react-dom';
import { HashRouter, Route} from 'react-router-dom';
import React from 'react'
import { Component } from 'react-simplified';
import { Alert, NavBar} from './widgets';
import {TicketList, FocusedTicket} from './content/tickets';
import {LiveFeed} from "./content/livefeed";
import {ArchiveList} from './content/archive';
import {Faq} from './content/faq'
import {SubmitForm} from './content/submit';

//import {createHashHistory} from 'history';
//const history = createHashHistory();

//menu for navigation
class Menu extends Component {
    render() {
        return (
            <NavBar brand="Mekanisk Support Dashboard">
                <NavBar.Link to="/tickets">Tickets</NavBar.Link>
                <NavBar.Link to="/archive">Archive</NavBar.Link>
            </NavBar>

        );
    }
}

//homepage
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

//the list of tickets
const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Alert />
                <Menu />
                <div class="card-columns">
                    <Route exact path="/" component={Faq} />
                    <Route exact path="/" component={SubmitForm} />
                </div>
                <div class="container-fluid">
                    <Route path="/tickets" component={LiveFeed} />
                    <Route path="/tickets" component={FocusedTicket} />
                    <Route path="/tickets" component={TicketList} />
                </div>
                    <Route path="/faq" component={Faq} />
                    <Route path="/archive" component={ArchiveList} />
                <Footer />
            </div>
        </HashRouter>,
        root
    );





