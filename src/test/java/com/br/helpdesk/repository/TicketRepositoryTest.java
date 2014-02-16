package com.br.helpdesk.repository;

import com.br.helpdesk.model.Ticket;
import com.br.helpdesk.model.User;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.WebAppConfiguration;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 10/18/13
 * Time: 3:20 PM
 * To change this template use File | Settings | File Templates.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/configuration/application.xml",
        "file:src/main/webapp/WEB-INF/configuration/database_test.xml","file:src/main/webapp/WEB-INF/configuration/security.xml"})
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class })
@DatabaseSetup(value="TicketData.xml")
public class TicketRepositoryTest {


    @Autowired
    private TicketRepository ticketRepository;

    @Test
    public void testFindIsOpen(){

        List<Ticket> openedTickets = ticketRepository.findByIsOpen(true);
        assertThat(openedTickets.size(), is(1));
        List<Ticket> closedTickets = ticketRepository.findByIsOpen(false);
        assertThat(closedTickets.size(),is(3));

    }


    @Test
    public void testFindBySearchParam(){
        // Testando tickets que contém "erro"
        List<Ticket> tickets = ticketRepository.search("erro");
        assertThat(tickets.size(), is(2));

        // Buscando todos os Tickets
        List<Ticket> allTickets = ticketRepository.search("");
        assertThat(allTickets.size(),is(4));

        // Testando se no caso de não achar o termo ele traz 0 tickets
        List<Ticket> zeroTickets = ticketRepository.search("1234");
        assertThat(zeroTickets.size(),is(0));

    }
    @Test
    public void testFindByUser(){
        User user = new User();
        user.setId(1l);
        List<Ticket> users = ticketRepository.findByUser(user);
        assertThat(users.size(),is(2));
    }
    @Test
    public void testCountByUser(){
        Long ticketsPerUser = ticketRepository.getTicketsPerUser(1l);
        assertThat(ticketsPerUser,is(2l));
    }
    @Test
    public void testFindBetweenDates() throws ParseException{
        SimpleDateFormat sdfm = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate1 = sdfm.parse("2013-10-17");
        Date startDate2 = sdfm.parse("2013-10-25");
        Date endDate1 = sdfm.parse("2013-10-24");
        Date endDate2 = sdfm.parse("2013-10-30");
        List<Ticket> tickets = ticketRepository.findBetweenDates(startDate1,startDate2,endDate1,endDate2);
        assertThat(tickets.size(),is(3));

    }
}
