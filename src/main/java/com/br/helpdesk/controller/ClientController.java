/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.br.helpdesk.controller;

import com.br.helpdesk.model.UserGroup;
import com.br.helpdesk.repository.ClientRepository;
import java.util.List;
import javax.annotation.Resource;
import org.apache.commons.collections.IteratorUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author rafaelpossas
 */
@Controller
@RequestMapping("/client")
public class ClientController {
        
    @Resource
    private ClientRepository clientRepository;
    
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody List<UserGroup> getAllClients(){
        return IteratorUtils.toList(clientRepository.findAll().iterator());
    }
    
}
