package com.br.helpdesk.controller;

import com.br.helpdesk.model.User;
import com.br.helpdesk.repository.TicketRepository;
import com.br.helpdesk.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class MainController {

    public static final String BAD_CREDENTIALS = "badcredentials";
    public static final String CREDENTIALS_EXPIRED = "credentialsexpired";
    public static final String ACCOUNT_LOCKED = "accountlocked";
    public static final String ACCOUNT_DISABLED = "accountdisabled";
    @Resource
    private TicketRepository ticketRepository;
    @Resource
    private UserRepository userRepository;

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView getHome() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView modelAndView = new ModelAndView("home");
        User user = userRepository.findByUserName(auth.getName());
        modelAndView.addObject("user", auth.getName());
        modelAndView.addObject("logged", true);
        modelAndView.addObject("client", user.getClient().getId());
        modelAndView.addObject("email", user.getEmail());
        return modelAndView;
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView getLogin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView modelAndView = new ModelAndView("login");
        if (!auth.getName().equals("anonymousUser")) {
            User user = userRepository.findByUserName(auth.getName());
            modelAndView.addObject("user", auth.getName());
            modelAndView.addObject("logged", true);
            modelAndView.addObject("client", user.getClient().getId());
            modelAndView.addObject("email", user.getEmail());
        } else {
            modelAndView.addObject("logged", false);
            modelAndView.addObject("user", "anonymousUser");
            modelAndView.addObject("client", "none");
        }
        return modelAndView;
    }

    @RequestMapping(value = "/loginsuccessful")
    public @ResponseBody
    String loginSuccessful() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName(); //get logged in username
        return "{success: true,username: \'" + name + "\'}";
    }

    @RequestMapping(value = "/login/{error}")
    public @ResponseBody
    String displayLoginform(@PathVariable final String error) {
        return "{success: false,error: \'" + error + "\'}";
    }

}
