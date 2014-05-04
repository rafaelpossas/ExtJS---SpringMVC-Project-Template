/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.br.helpdesk.service;

import com.br.helpdesk.model.Ticket;
import com.br.helpdesk.model.User;
import com.br.helpdesk.repository.UserRepository;
import javax.annotation.Resource;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author rafaelpossas
 */
@Service
public class UserService extends BaseService<User,Long> {

    @Resource
    public UserRepository userRepository;
    @Override
    public CrudRepository getRepository() {
        return userRepository;
    }

    @Override
    public void setRepository(CrudRepository repository) {
        this.userRepository = (UserRepository) repository; 
    }
    public User findByUserName(String username){
        return userRepository.findByUserName(username);
    }
    
}
