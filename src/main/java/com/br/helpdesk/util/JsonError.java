/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.br.helpdesk.util;
import java.util.Map;
import java.util.TreeMap;
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
        Map<String, Object> map = new TreeMap<String, Object>();
        map.put("error", message);
        return new ModelAndView(jsonView, map);
    }
}
