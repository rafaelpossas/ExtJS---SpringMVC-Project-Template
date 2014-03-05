package com.br.helpdesk.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 10/18/13
 * Time: 4:20 PM
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "USER")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Basic
    @Column(name="NAME")
    private String name;
    @Basic
    @Column(name = "USERNAME",unique = true)
    private String userName;

    @Basic
    @Column(name = "PASSWORD",nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "CLIENT_ID",nullable = false)
    private Client client;
    

    @Basic
    @Column(name="ISENABLED")
    private Boolean isEnabled;
    
    @Basic
    @Column(name="EMAIL")
    private String email;


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
