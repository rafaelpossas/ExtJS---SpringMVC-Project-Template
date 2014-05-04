/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.br.helpdesk.repository;

import com.br.helpdesk.model.Ticket;
import com.br.helpdesk.model.User;
import java.util.Calendar;
import java.util.Date;
import javax.annotation.Resource;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

/**
 *
 * @author rafaelpossas
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/configuration/application.xml",
        "file:src/main/webapp/WEB-INF/configuration/database.xml","file:src/main/webapp/WEB-INF/configuration/security.xml"})
public class TicketDataCreation {
    
    @Resource
    private TicketRepository ticketRepository;
    @Resource
    private UserRepository userRepository;
    @Test
    public void createTickets(){
        User user = userRepository.findOne(3L);
        for (int i = 0; i < 10; i++) {
            Ticket ticket = new Ticket();
            ticket.setUser(user);
            Date startDate,endDate = Calendar.getInstance().getTime();
            ticket.setStartDate(Calendar.getInstance().getTime());
            ticket.setEndDate(endDate);
            ticket.setTitle("Bug xxxxxxxx");
            ticket.setDescription("Erro ao tentar salvarxxxxxx");
            ticket.setIsOpen(true);
            ticketRepository.save(ticket);
        }
    }
}
