package com.br.helpdesk.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 13/10/13
 * Time: 09:04
 * To change this template use File | Settings | File Templates.
 */

@Entity
@Table(name="TICKET")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Basic
    @Column(name="ISOPEN",nullable = false)
    private Boolean isOpen;

    @ManyToOne
    @JoinColumn(name="USER_ID",nullable = true)
    private User user;

    @Basic
    @Column(name="START_DATE",nullable = false)
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Basic
    @Column(name="END_DATE",nullable = true)
    @Temporal(TemporalType.DATE)
    private Date endDate;


    @Lob
    @Column(name="DESCRIPTION")
    private String description;

    @Basic
    @Column(name="TITLE")
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Boolean getOpen() {
        return isOpen;
    }

    public void setOpen(Boolean open) {
        isOpen = open;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
