/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.br.helpdesk.model;

import java.io.Serializable;

/**
 *
 * @author rafaelpossas
 */
public class TicketContainer implements Serializable {
    
    private String user;
    private int allTickets;
    private int myTickets;
    private int openedTickets;
    private int closedTickets;

    /**
     * @return the allTickets
     */
    public int getAllTickets() {
        return allTickets;
    }

    /**
     * @param allTickets the allTickets to set
     */
    public void setAllTickets(int allTickets) {
        this.allTickets = allTickets;
    }

    /**
     * @return the myTickets
     */
    public int getMyTickets() {
        return myTickets;
    }

    /**
     * @param myTickets the myTickets to set
     */
    public void setMyTickets(int myTickets) {
        this.myTickets = myTickets;
    }

    /**
     * @return the openedTickets
     */
    public int getOpenedTickets() {
        return openedTickets;
    }

    /**
     * @param openedTickets the openedTickets to set
     */
    public void setOpenedTickets(int openedTickets) {
        this.openedTickets = openedTickets;
    }

    /**
     * @return the closedTickets
     */
    public int getClosedTickets() {
        return closedTickets;
    }

    /**
     * @param closedTickets the closedTickets to set
     */
    public void setClosedTickets(int closedTickets) {
        this.closedTickets = closedTickets;
    }

    /**
     * @return the user
     */
    public String getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(String user) {
        this.user = user;
    }
}
