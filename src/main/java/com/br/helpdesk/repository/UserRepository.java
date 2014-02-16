package com.br.helpdesk.repository;

import com.br.helpdesk.model.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 10/18/13
 * Time: 4:32 PM
 * To change this template use File | Settings | File Templates.
 */
public interface UserRepository extends CrudRepository<User,Long> {
}
