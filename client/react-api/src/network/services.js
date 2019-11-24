// @flow

import axios from 'axios';


import {sharedComponentData} from "react-simplified";

export class Ticket {
    ticket_id: number;
    headline: String;
    priority: number;
    category: String;
    picture: String;
    post_date: String;
    author: String;
}


class TicketService {


    createTicket(json: Object) {
        return axios.post<>('/create_ticket', json);
    }

    createComment(json: Object) {
        return axios.post<>('/create_comment', json);
    }

    getTickets(priority: number): Promise<any> {
        return axios.get<>('/tickets/priority/' + priority);
    }

    getComments(ticket_id: number): Promise<any> {
        return axios.get<>('/comments/ticket_id/' + ticket_id);
    }

    getAllTickets(): Promise<any> {
        return axios.get<>('/tickets/');
    }

    updateTicketPriority(json: Object): Promise<any> {
        return axios.put('/tickets', json);
    }

    solveTicket(json: Object) {
        return axios.put<>('/tickets', json);
    }

    getGroups() {
        return axios.get<>('/groups');
    }
}

export let ticketService = sharedComponentData(new TicketService());


