/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.br.helpdesk.service;

import java.io.Serializable;
import java.util.List;
import org.apache.commons.collections.IteratorUtils;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author rafaelpossas
 * @param <ID> - The ID type of the entity
 * @param <T> - The Object Type of the entity
 */
public abstract class BaseService<T extends Object, ID extends Serializable> {
    
    protected CrudRepository<T,ID> repository;
    
    public abstract CrudRepository<T,ID> getRepository();
    
    public abstract void setRepository(CrudRepository repository);
    
    public T save(T object){
        return getRepository().save(object);
    }
    public List<T> findAll(){
        return IteratorUtils.toList(getRepository().findAll().iterator());
    }
    public void delete(T object){
        getRepository().delete(object);
    }
    public T findOne(ID id){
        return getRepository().findOne(id);
    }
}
