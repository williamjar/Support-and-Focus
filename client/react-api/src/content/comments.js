import {Component} from "react-simplified";
import {ticketService} from "../network/services";
import {Button, Form} from "react-bootstrap";

export class Comment extends Component {
    constructor(props){
        super(props);

        this.state = {
            content : null,
            priority : null,
            post_date : '2019-03-15 01:01:22',
            ticket_id : null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value,});
    }
    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        if(this.submitComment()) alert("Thank you for your submission!");
        window.location.reload();

    }

    sumbitComment() {
        let json: {} = {
            "content" : this.content,
            "priority" : this.priority,
            "post_date" : this.post_date,
            "ticket_id" : this.ticket_id
        };
        window.location.reload();
        ticketService.createComment(json);
    }

    render() {
        return(
            <div className="card col-lg4 m-4 bg-dark text-white">
                <div class="m-4">
                    <Form onSubmit = {this.handleSubmit}>
                        <Form.Group>
                            <Form.Control as="textarea" rows="6" name="content" maxLength="255" placeholder="Please briefly explain the issue" value={this.state.content} onChange={this.handleInputChange} />
                            <Form.Text> Max length: 255 </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={this.content=null} variant="btn btn-primary btn-lg" type="submit"> Submit </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>


        )
    }


}