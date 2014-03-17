/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.br.helpdesk.controller;

import com.br.helpdesk.model.User;
import com.br.helpdesk.repository.UserRepository;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.collections.IteratorUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author rafaelpossas
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserRepository userRepository;

    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    public @ResponseBody
    User getByUserName(@PathVariable String username) {
        User user = userRepository.findByUserName(username);
        return user;

    }

    @RequestMapping(value = {"", "/{id}"}, method = {RequestMethod.PUT, RequestMethod.POST})
    @ResponseBody
    public User save(@RequestBody User user) {
        user = null;
        user.getName();
        user = userRepository.save(user);
        return user;

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String,? extends Object> delete(@RequestBody User user) {
        userRepository.delete(user);
        Map<String, Object> map = new TreeMap<String, Object>();
        map.put("success", true);
        return map;
    }

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<User> getAllUsers() {
        List<User> users = IteratorUtils.toList(userRepository.findAll().iterator());
        return users;

    }

}
