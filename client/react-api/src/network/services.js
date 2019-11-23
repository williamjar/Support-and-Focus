// @flow

import * as React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import {sharedComponentData} from "react-simplified";
export class Ticket {
    ticket_id : number;
    headline : String;
    priority : number;
    category : String;
    picture : String;
    post_date : String;
    author : String;
}



class TicketService {
    tickets: Ticket[] = [];
    comments: Comment[] = [];

    createTicket(json: Object) {
        console.log(json);
        return axios.post<>('/create_ticket', json);
    }

    createComment(json: Object) {
        console.log(json);
        return axios.post<>('/create_comment', json);
    }

    getTickets(priority: number): Promise<any> {
        return axios.get<Ticket[]>('/tickets/priority/' + priority);
    }

    getComments(ticket_id: number): Promise<any> {
        console.log("getcomment with ticket id" + ticket_id);
        return axios.get<Comments[]>('/comments/ticket_id/' + ticket_id);
    }

    getAllTickets(): Promise<any> {
        return axios.get<Ticket[]>('/tickets');
    }

    updateTicketPriority(json: Object): Promise<any> {
        return axios.put('/tickets', json);
    }

    getArchive() {
        return axios.get<Archive[]>('/archive').then(response => response.data);
    }

    solveTicket(json: Object) {
        axios.put<>('/tickets', json);
    }
}

export let ticketService = sharedComponentData(new TicketService());


