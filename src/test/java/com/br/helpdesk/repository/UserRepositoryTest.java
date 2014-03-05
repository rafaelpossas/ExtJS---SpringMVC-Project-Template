package com.br.helpdesk.repository;

import com.br.helpdesk.model.Client;
import com.br.helpdesk.model.User;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.annotation.Resource;

/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 10/18/13
 * Time: 4:32 PM
 * To change this template use File | Settings | File Templates.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/configuration/application.xml",
        "file:src/main/webapp/WEB-INF/configuration/database_test.xml","file:src/main/webapp/WEB-INF/configuration/security.xml"})
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class })
@DatabaseSetup("UserData.xml")
public class UserRepositoryTest {

    @Resource
    private UserRepository userRepository;
    @Resource
    private ClientRepository clientRepository;

    @Test(expected = DataIntegrityViolationException.class)
    public void testSaveUserWithSameUsername(){
        Client client = clientRepository.findOne(1l);
        User user = new User();
        user.setUserName("rafaelpossas");
        user.setPassword("1234");
        user.setClient(client);
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testRemoveUserWithTickets(){
        User user = userRepository.findOne(1l);
        userRepository.delete(user);
    }
}
