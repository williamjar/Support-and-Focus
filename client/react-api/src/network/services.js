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
    tickets : Ticket[] = [];

    createTicket(json : Object) {
        console.log(json);
        return axios.post<>('/create_ticket', json);
    }

    getTickets(priority : number) : Promise<any> {
        console.log(this.tickets[1]);
        return axios.get<Ticket[]>('/tickets/priority/'+ priority).then(res => (this.tickets = res.data));
    }

    updateTicketPriority(json : Object) : Promise<any>{
        console.log(json);
        return axios.put('/tickets', json);
    }

    getArchive() {
        return axios.get<Archive[]>('/archive').then(response => response.data);
    }

    deleteArchivedTicket(json){
        axios.delete<>('/delete_archive', {data : json});
    }

    solveTicket(json : Object){
        axios.post<>('/archive_ticket', json);
        axios.delete<>('/delete_ticket', {data : json});
    }

}

export let ticketService = sharedComponentData(new TicketService());