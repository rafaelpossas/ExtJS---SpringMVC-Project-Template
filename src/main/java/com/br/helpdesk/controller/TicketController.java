package com.br.helpdesk.controller;

import com.br.helpdesk.model.Ticket;
import com.br.helpdesk.model.TicketContainer;
import com.br.helpdesk.model.User;
import com.br.helpdesk.service.TicketService;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;


    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<Ticket> getAllTickets() {
        return getTicketService().findAll();
    }

    @RequestMapping(method = RequestMethod.GET, params = {"start", "limit"})
    public @ResponseBody
    List<Ticket> getTotalWithPaging(@RequestParam int start, @RequestParam int limit) {
        int pageSize = limit - start;
        int page;
        if (start == 0) {
            page = 0;
        } else {
            page = (limit / pageSize) - 1;
        }
        PageRequest pageRequest = new PageRequest(page, pageSize);
        return getTicketService().findAll(pageRequest);

    }

    @RequestMapping(value = "count", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, ? extends Object> getCountAll() {
        long size = ticketService.countAll();
        Map<String, Object> map = new TreeMap<String, Object>();
        map.put("size", size);
        return map;

    }

    @RequestMapping(value = "isopen/{isOpen}", method = RequestMethod.GET)
    public @ResponseBody
    List<Ticket> getByIsOpen(@PathVariable Boolean isOpen) {
        return getTicketService().findByIsOpen(isOpen);
    }

    @RequestMapping(value = "isopen/{isOpen}", method = RequestMethod.GET, params = {"start", "limit"})
    public @ResponseBody
    List<Ticket> getByIsOpenWithPaging(@PathVariable Boolean isOpen, @RequestParam int start, @RequestParam int limit) {
        int pageSize = limit - start;
        int page;
        if (start == 0) {
            page = 0;
        } else {
            page = (limit / pageSize) - 1;
        }
        PageRequest pageRequest = new PageRequest(page, pageSize);
        
        return getTicketService().findByIsOpen(isOpen, pageRequest);
    }

    @RequestMapping(value = "isopen/{isOpen}/count", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, ? extends Object> getCountByIsOpen(@PathVariable Boolean isOpen) {
        long size = ticketService.countByIsOpen(isOpen);
        Map<String, Object> map = new TreeMap<String, Object>();
        map.put("size", size);
        return map;

    }

    @RequestMapping(value = "isopen/{isOpen}/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<Ticket> getIsOpenByUser(@PathVariable Long id,@PathVariable Boolean isOpen) {
        User user = new User();
        user.setId(id);
        return getTicketService().findByUserAndIsOpen(user, isOpen);
    }

    @RequestMapping(value = "isopen/{isOpen}/{id}", method = RequestMethod.GET, params = {"start", "limit"})
    public @ResponseBody
    List<Ticket> getIsOpenByUserWithPaging(@PathVariable Long id,@PathVariable Boolean isOpen, @RequestParam int start, @RequestParam int limit) {
        User user = new User();
        user.setId(id);
        int pageSize = limit - start;
        int page;
        if (start == 0) {
            page = 0;
        } else {
            page = (limit / pageSize) - 1;
        }
        PageRequest pageRequest = new PageRequest(page, pageSize);
        return getTicketService().findByUserAndIsOpen(user, isOpen, pageRequest);

    }

    @RequestMapping(value = "isopen/{isOpen}/{id}/count", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, ? extends Object> getCountIsOpenByUser(@PathVariable Long id,@PathVariable Boolean isOpen) {
        User user = new User();
        user.setId(id);
        long size = ticketService.countByUserAndIsOpen(user, Boolean.TRUE);
        Map<String, Object> map = new TreeMap<String, Object>();
        map.put("size", size);
        return map;

    }

    @RequestMapping(value = "overview/{id}", method = RequestMethod.GET)
    public @ResponseBody
    TicketContainer getOverviewByUser(@PathVariable String id) {
        TicketContainer ticketContainer = new TicketContainer();
        ticketContainer.setUser(id);
        User user = new User();
        user.setId(Long.parseLong(id));
        ticketContainer.setAllTickets(getTicketService().findAll().size());
        ticketContainer.setMyTickets(getTicketService().findByUserAndIsOpen(user, Boolean.TRUE).size());
        ticketContainer.setClosedTickets(getTicketService().findByIsOpen(Boolean.FALSE).size());
        ticketContainer.setOpenedTickets(getTicketService().findByIsOpen(Boolean.TRUE).size());
        return ticketContainer;
    }

    /**
     * @return the ticketService
     */
    public TicketService getTicketService() {
        return ticketService;
    }

    /**
     * @param ticketService the ticketService to set
     */
    public void setTicketService(TicketService ticketService) {
        this.ticketService = ticketService;
    }
}
