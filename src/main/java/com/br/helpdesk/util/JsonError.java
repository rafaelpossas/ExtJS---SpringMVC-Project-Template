/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.br.helpdesk.util;

import com.google.common.collect.ImmutableMap;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;


/**
 *
 * @author rafaelpossas
 */
public class JsonError {

    private final String message;

    public JsonError(String message) {
        this.message = message;
    }

    public ModelAndView asModelAndView() {
        MappingJacksonJsonView jsonView = new MappingJacksonJsonView();
        return new ModelAndView(jsonView, ImmutableMap.of("error", message));
    }
}
