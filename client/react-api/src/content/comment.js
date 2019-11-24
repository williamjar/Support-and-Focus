// @flow

import {ticketService} from "../network/services";
import {Button,Row, Form} from "react-bootstrap";
import React from 'react';

export class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        };
    }

    render() {
        if (this.state.comments.length === 0) return (<div>No comments yet</div>);
        return (
            <div>
                <h5>Comments:</h5>
                {this.state.comments.map(comment => (
                    <p className={"card-text"}>
                        <span
                            className="card-text small text-muted">{this.convertDateTimeFromSQL(comment.post_date)} </span>
                        {comment.content}
                    </p>
                ))}
            </div>
        )
    }

    componentDidMount() {
        ticketService
            .getComments(this.props.id)
            .then(res => {
                const comments = res.data;
                this.setState({comments})
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
        return hour + ':' + minute + ', ' + day + '.' + month + '.' + year;
    }
}

export class CommentSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            priority: 1,
            post_date: '2019-03-15 01:01:22',
            ticket_id: this.props.id
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render() {
        return (
            <div className={"ml-3"}>
                <Form onSubmit={this.handleSubmit}>
                    <Row>

                        <Form.Group>
                            <Form.Control type="textarea" maxLength="75" name="commentSubmit"
                                          placeholder="Write a comment" value={this.state.content}
                                          onChange={this.handleInputChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Button className="ml-2" variant="btn btn-primary bt-md" type="submit"> Submit </Button>
                        </Form.Group>
                    </Row>

                </Form>
            </div>
        )
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({content: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.submitComment();
    }

    submitComment() {
        window.location.reload();
        let json = {
            "content": this.state.content,
            "priority": this.state.priority,
            "post_date": this.state.post_date,
            "ticket_id": this.state.ticket_id
        };
        ticketService.createComment(json).then(() => console.log("comment created successfully"));
    }

    componentDidMount() {
        console.log("this is the submit form for comment id " + this.props.id);

    }


}