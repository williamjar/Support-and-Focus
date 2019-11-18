// @flow
import axios from 'axios';

export class Ticket {
    ticket_id : number;
    headline : String;
    priority : number;
    category : String;
    picture : String;
    post_date : String;
    author : String;
}

export class Archive {
    ticket_id : number;
    headline : String;
    priority : number;
    category : String;
    picture : String;
    post_date : String;
    author : String;
}

class TicketService {

    createTicket(json : Object) {
        console.log(json);
        return axios.post<>('/create_ticket', json);
    }

    getTickets() {
        return axios.get<Ticket[]>('/tickets').then(response => response.data);
    }

    getArchive() {
        return axios.get<Archive[]>('/archive').then(response => response.data);
    }

    deleteTicket(json : Object){
        axios.post<>('/archive_ticket', json);
        axios.delete<>('/delete_ticket', {data : json});
    }

}

export let ticketService = new TicketService();