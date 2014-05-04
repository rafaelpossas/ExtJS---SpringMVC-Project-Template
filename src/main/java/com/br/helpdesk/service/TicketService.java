/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.br.helpdesk.service;

import com.br.helpdesk.model.Ticket;
import com.br.helpdesk.model.User;
import com.br.helpdesk.repository.TicketRepository;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author rafaelpossas
 */
@Service
public class TicketService extends BaseService<Ticket, Long> {

    @Resource
    public TicketRepository ticketRepository;

    @Override
    public CrudRepository getRepository() {
        return ticketRepository;
    }

    @Override
    public void setRepository(CrudRepository repository) {
        this.ticketRepository = (TicketRepository) repository;
    }

    public List<Ticket> findByIsOpen(Boolean isOpen) {
        return ticketRepository.findByIsOpen(isOpen);
    }

    public List<Ticket> findByIsOpen(Boolean isOpen,Pageable pageable) {
        return ticketRepository.findByIsOpen(isOpen,pageable);
    }

    public List<Ticket> findByUserAndIsOpen(User user, Boolean isOpen) {
        return ticketRepository.findByUserAndIsOpen(user, isOpen);
    }

    public List<Ticket> findByUserAndIsOpen(User user, Boolean isOpen, Pageable pageable) {
        Page<Ticket> tickets = ticketRepository.findByUserAndIsOpen(user, isOpen, pageable);
        return tickets.getContent();
    }

    public long countByUserAndIsOpen(User user, Boolean isOpen) {
        return ticketRepository.countByUserAndIsOpen(user, isOpen);
    }

    public long countByIsOpen(Boolean isOpen) {
        return ticketRepository.countByIsOpen(isOpen);
    }

    public List<Ticket> findAll(Pageable pageable) {
        Page<Ticket> tickets = ticketRepository.findAll(pageable);
        return tickets.getContent();
    }

    public long countAll() {
        return ticketRepository.countAll();
    }

}
