/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.br.helpdesk.controller;

import com.br.helpdesk.model.Category;
import com.br.helpdesk.service.CategoryService;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.multiaction.NoSuchRequestHandlingMethodException;

/**
 *
 * @author rafaelpossas
 */
@Controller
@RequestMapping(value = "/category")
public class CategoryController extends BaseController {
    
    private CategoryService categoryService;
    
    @Autowired
    public void setCategoryService(CategoryService service){
        this.categoryService = service;
    }
    @Autowired
    public CategoryController(CategoryService service){
        this.categoryService = service;
    }
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody List<Category> getAllCategories() {
        return categoryService.findAll();
    }

    @RequestMapping(value = {"", "/{id}"}, method = {RequestMethod.POST, RequestMethod.PUT})
    @ResponseBody
    public Category saveCategory(@RequestBody Category category) {
        return categoryService.save(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String, ? extends Object> deleteCategory(@PathVariable Long id) throws NoSuchRequestHandlingMethodException {
        Category category = categoryService.findOne(id);
        categoryService.delete(category);
        Map<String, Object> map = new TreeMap<String, Object>();
        map.put("success", true);
        return map;
    }

}
