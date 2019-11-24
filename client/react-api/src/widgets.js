// @flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {NavLink} from 'react-router-dom';
import {Button, Card, Row} from "react-bootstrap";


export class FromDatetime extends React.Component<{post_date : String}> {

    render(){
        return(
            <div>
                    {this.convertDateTimeFromSQL(this.props.post_date)}
            </div>
        )
    }

    convertDateTimeFromSQL(date: string) {
        var str = date.split('-');
        var year = str[0];
        var month = str[1];
        var rest = str[2];
        var time = rest.split('T');
        var day = time[0];
        var restTime = time[1].split(':');
        var hour = restTime[0];
        var minute = restTime[1];
        return hour + ':' + minute + ', ' + day + '.' + month + '.' + year;
    }
}

export class PlaceholderTicket extends React.Component {
    render() {
        return (
            <Row>
                <div className="col-lg-4">
                    <Card className="m-4 bg-dark text-white">
                        <Button variant="outline-info" disabled>Placeholder ticket</Button>
                        <div className="card-header"><h5
                            className="card-title text-center"><span className="text-info">Focus</span> to place
                            tickets here</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-subtitle m-2 text-center"><span className="text-info">Focus</span> a
                                ticket from the list below to move it here, and get access to additional support
                                tools</p>
                            <br/>
                            <br/>
                        </div>
                        <br/>
                        <br/>
                    </Card>
                </div>
            </Row>
        )
    }
}

export class Alert extends Component {
    alerts: { id: number, text: React.Node, type: string }[] = [];
    static nextId = 0;

    render() {
        return (
            <>
                {this.alerts.map((alert, i) => (
                    <div key={alert.id} className={'alert alert-' + alert.type} role="alert">
                        {alert.text}
                        <button
                            type="button"
                            className="close"
                            onClick={() => {
                                this.alerts.splice(i, 1);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </>
        );
    }

    static success(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({
                id: Alert.nextId++,
                text: text,
                type: 'success'
            });
        });
    }

    static info(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({
                id: Alert.nextId++,
                text: text,
                type: 'info'
            });
        });
    }

    static warning(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({
                id: Alert.nextId++,
                text: text,
                type: 'warning'
            });
        });
    }

    static danger(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({
                id: Alert.nextId++,
                text: text,
                type: 'danger'
            });
        });
    }
}

class NavBarLink extends Component<{ exact?: boolean, to: string, children?: React.Node }> {
    render() {
        return (
            <NavLink className="nav-link" activeClassName="active" exact={this.props.exact} to={this.props.to}>
                {this.props.children}
            </NavLink>
        );
    }
}

/**
 * Renders a navigation bar using Bootstrap classes
 */
export class NavBar extends Component<{ brand?: React.Node, children?: React.Node }> {
    static Link = NavBarLink;

    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                {
                    <NavLink className="navbar-brand" activeClassName="active" exact to="/">
                        {this.props.brand}
                    </NavLink>
                }
                <ul className="navbar-nav">{this.props.children}</ul>
            </nav>
        );
    }
}


/**
 * Renders a column with specified width using Bootstrap classes
 */
export class Column extends Component<{ width?: number, right?: boolean, children?: React.Node }> {
    render() {
        return (
            <div
                className={'col' + (this.props.width ? '-' + this.props.width : '') + (this.props.right ? ' text-right' : '')}
            >
                {this.props.children}
            </div>
        );
    }
}

