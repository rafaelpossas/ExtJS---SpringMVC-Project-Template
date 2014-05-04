/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.br.helpdesk.controller;

import com.br.helpdesk.model.User;
import com.br.helpdesk.service.UserService;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import javax.annotation.Resource;
import org.apache.commons.collections.IteratorUtils;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
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
    private UserService userService;

    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    public @ResponseBody
    User getByUserName(@PathVariable String username) {
        User user = userService.findByUserName(username);
        return user;

    }

    @RequestMapping(value = {"", "/{id}"}, method = {RequestMethod.PUT, RequestMethod.POST})
    @ResponseBody
    public User save(@RequestBody User user) {
        user = userService.save(user);
        return user;

    }

    @RequestMapping(value = {"/profile"}, method = RequestMethod.PUT)
    @ResponseBody
    public String updateProfile(@RequestBody String req) {
        JSONObject profile = new JSONObject(req);
        User user = userService.findOne(Long.parseLong((String) profile.get("id")));
        user.setName((String) profile.get("name"));
        user.setEmail((String) profile.get("email"));
        userService.save(user);
        return req;

    }

    @RequestMapping(value = {"/password"}, method = RequestMethod.PUT)
    @ResponseBody
    public String updatePassword(@RequestBody String req) {
        JSONObject profile = new JSONObject(req);
        User user = userService.findOne(Long.parseLong((String) profile.get("id")));
        user.setPassword(String.valueOf(profile.get("newpassword")));
        userService.save(user);
        return req;

    }

    @RequestMapping(value = {"/checkusername"}, method = RequestMethod.POST, params = {"username"})
    @ResponseBody
    public Boolean checkUserName(@RequestParam String username) {
        User user = userService.findByUserName(username);
        Boolean userPresence;
        if (user == null) {
            userPresence = true;
        } else {
            userPresence = false;
        }
        return userPresence;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String, ? extends Object> delete(@PathVariable Long id) {
        User user = userService.findOne(id);
        userService.delete(user);
        Map<String, Object> map = new TreeMap<String, Object>();
        map.put("success", true);
        return map;
    }

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<User> getAllUsers() {
        List<User> users = IteratorUtils.toList(userService.findAll().iterator());
        return users;

    }

}
