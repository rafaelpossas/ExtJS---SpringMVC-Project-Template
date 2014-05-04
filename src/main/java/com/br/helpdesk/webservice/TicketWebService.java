package com.br.helpdesk.webservice;

import com.br.helpdesk.model.Ticket;

import javax.jws.WebMethod;
import javax.jws.WebService;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 10/21/13
 * Time: 6:16 PM
 * To change this template use File | Settings | File Templates.
 */
@WebService
public interface TicketWebService {

    @WebMethod
    public List<Ticket> search(String searchTerm);
}
