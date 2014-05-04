package com.br.helpdesk.webservice;

import com.br.helpdesk.model.Ticket;
import com.br.helpdesk.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.jws.WebService;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 10/21/13
 * Time: 6:17 PM
 * To change this template use File | Settings | File Templates.
 */
@WebService(endpointInterface = "com.br.helpdesk.webservice.TicketWebService",serviceName = "ticketWebService")
public class TicketWebServiceImpl implements TicketWebService {

    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> search(String searchTerm){
        return ticketRepository.search(searchTerm);
    }
}
