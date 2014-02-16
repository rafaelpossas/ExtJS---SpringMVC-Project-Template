package com.br.helpdesk.controller;

import com.br.helpdesk.model.Ticket;
import com.br.helpdesk.repository.TicketRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 11/14/13
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping("/ticket")
public class TicketController {

    @Resource
    private TicketRepository ticketRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<Ticket> getAllTickets() {
        return ticketRepository.findByIsOpen(true);
    }
}
