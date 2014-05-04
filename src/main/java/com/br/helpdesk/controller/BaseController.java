/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.br.helpdesk.controller;

import com.br.helpdesk.util.JsonError;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * NULL_SAVE_ERROR = Error when a null entity is passed as the argument of the
 * save method NULL_DELETE_ERROR = Error when a null entity is passed as the
 * argument of the delete method
 */
public class BaseController {
    
    @ExceptionHandler(InvalidDataAccessApiUsageException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ModelAndView deletEntityMustNotBeNull(InvalidDataAccessApiUsageException ex) {
        String message = ex.getMessage();
        if (message.indexOf("The entity must not be null") != -1) {
            return new JsonError("NULL_DELETE_ERROR").asModelAndView();
        } else if (message.indexOf("Bean object must not be null") != -1) {
            return new JsonError("NULL_SAVE_ERROR").asModelAndView();
        } else {
            return new JsonError(ex.getMessage()).asModelAndView();
        }

    }
}
