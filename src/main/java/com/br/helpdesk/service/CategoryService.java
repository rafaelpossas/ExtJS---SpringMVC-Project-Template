/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.br.helpdesk.service;

import com.br.helpdesk.model.Category;
import com.br.helpdesk.repository.CategoryRepository;
import javax.annotation.Resource;
import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Service;

/**
 *
 * @author rafaelpossas
 */
@Service
public class CategoryService extends BaseService<Category,Long>{
    
    @Resource
    private CategoryRepository categoryRepository;

    @Override
    public CrudRepository getRepository() {
        return categoryRepository;
    }
    @Override
    public void setRepository(CrudRepository repository){
        this.categoryRepository = (CategoryRepository) repository;
    }
    



}
