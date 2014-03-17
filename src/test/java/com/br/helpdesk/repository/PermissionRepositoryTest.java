/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.br.helpdesk.repository;

import com.br.helpdesk.model.Menu;
import com.br.helpdesk.model.Permission;
import com.br.helpdesk.model.UserGroup;
import com.br.helpdesk.model.key.PermissionId;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import java.util.List;
import javax.annotation.Resource;
import org.apache.commons.collections.IteratorUtils;
import org.junit.Assert;
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


/**
 *
 * @author rafaelpossas
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/configuration/application.xml",
        "file:src/main/webapp/WEB-INF/configuration/database_test.xml","file:src/main/webapp/WEB-INF/configuration/security.xml"})
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class })
@DatabaseSetup("PermissionData.xml")
public class PermissionRepositoryTest {
    @Resource
    private PermissionRepository permissionRepository;
    
    @Test
    public void testFindByUserGroupMenu(){
        UserGroup userGroup = new UserGroup();
        Menu menu = new Menu();
        userGroup.setId(1L);
        menu.setId(1L);
        PermissionId permId = new PermissionId();
        permId.setMenu(menu);
        permId.setUserGroup(userGroup);
        Permission permission = permissionRepository.findByPermissionId(permId);
        Assert.assertNotNull(permission);
    }
    
    @Test(expected = DataIntegrityViolationException.class)
    public void testSaveWithoutUserGroup(){
        UserGroup userGroup = new UserGroup();
        Menu menu = new Menu();
        userGroup.setId(10L);
        menu.setId(1L);
        PermissionId permId = new PermissionId();
        permId.setMenu(menu);
        permId.setUserGroup(userGroup);
        Permission permission = new Permission();
        permission.setPermissionId(permId);
        permissionRepository.save(permission);
    }
    @Test
    public void testSavePermission(){
        UserGroup userGroup = new UserGroup();
        Menu menu = new Menu();
        userGroup.setId(2L);
        menu.setId(2L);
        PermissionId permId = new PermissionId();
        permId.setMenu(menu);
        permId.setUserGroup(userGroup);
        Permission permission = new Permission();
        permission.setPermissionId(permId);
        permissionRepository.save(permission);
        List<Permission> permissions = IteratorUtils.toList(permissionRepository.findAll().iterator());
        Assert.assertEquals(2,permissions.size());
    }
}
