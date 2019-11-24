import * as React from 'react';
import { Component } from 'react-simplified';
import {shallow} from "enzyme";
import {Comments} from "../content/comment";
import {ticketService} from "../network/services";


describe('Comment test', () => {
    let comment = {
        content: '',
        priority: 1,
        post_date: '2019-03-15 01:01:22',
        ticket_id: 4
    };

    const a = jest.spyOn(ticketService, "getComments").mockResolvedValue(comment);
    const wrapper = shallow(
        <Comments id={1}/>
    );

    it('should render component', () =>{
        expect(typeof wrapper).toEqual('object');
    });

    it('should set up article variables', () => {
        let instance = Comment.instance();
        expect(instance.content).toMatch("");
    });


});
