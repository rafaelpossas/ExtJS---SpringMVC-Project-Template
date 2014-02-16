package com.br.helpdesk.model;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 10/18/13
 * Time: 1:59 PM
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "CLIENT")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ID")
    private Long id;

    @Basic
    @Column(name = "DESCRIPTION")
    private String description;


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
}
