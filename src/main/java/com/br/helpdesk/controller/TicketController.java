package com.br.helpdesk.controller;

import com.br.helpdesk.model.Ticket;
import com.br.helpdesk.repository.TicketRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import java.util.List;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/ticket")
public class TicketController {

    @Resource
    private TicketRepository ticketRepository;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody List<Ticket> getAllTickets() {
        return ticketRepository.findByIsOpen(true);
    }
}
