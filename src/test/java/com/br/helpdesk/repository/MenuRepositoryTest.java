/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.br.helpdesk.repository;

import com.br.helpdesk.model.Menu;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import java.io.File;
import java.sql.Connection;
import java.util.List;
import javax.annotation.Resource;
import javax.sql.DataSource;
import org.apache.commons.collections.IteratorUtils;
import org.dbunit.database.DatabaseConnection;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.ReplacementDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSetBuilder;
import org.dbunit.operation.DatabaseOperation;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.datasource.DataSourceUtils;
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
    "file:src/main/webapp/WEB-INF/configuration/database_test.xml", "file:src/main/webapp/WEB-INF/configuration/security.xml"})
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class,
    DirtiesContextTestExecutionListener.class,
    TransactionalTestExecutionListener.class,
    DbUnitTestExecutionListener.class})
public class MenuRepositoryTest {

    @Resource
    private MenuRepository menuRepository;
    @Autowired
    protected DataSource dataSource;
    
    @Before
    public void setupDB() throws Exception {
        FlatXmlDataSetBuilder builder = new FlatXmlDataSetBuilder();
        builder.setColumnSensing(true);
        Connection con = DataSourceUtils.getConnection(dataSource);
        IDatabaseConnection dbUnitCon = new DatabaseConnection(con);
        IDataSet dataSet = builder.build(new File("src/main/resources/com/br/helpdesk/repository/MenuData.xml"));
        ReplacementDataSet replacementDataSet = new ReplacementDataSet(dataSet); 
        replacementDataSet.addReplacementObject("[NULL]", null);
        DatabaseOperation.CLEAN_INSERT.execute(dbUnitCon, replacementDataSet);
        DataSourceUtils.releaseConnection(con, dataSource);
    }
    
    @Test
    public void testOneToManyAssociation() {
        List<Menu> menus = menuRepository.findByMenu(null);
        Assert.assertEquals(1, menus.size());
        Assert.assertEquals(3, menus.get(0).getItems().size());
    }
    
    @Test(expected = DataIntegrityViolationException.class)
    public void testDataIntegrityException(){
        List<Menu> menus = IteratorUtils.toList(menuRepository.findAll().iterator());
        Menu menu = menus.get(0);
        menuRepository.delete(menu);
    }
    
    @Test
    public void testTreeRemoval(){
        Menu menu = menuRepository.findOne(4L);
        menu.setMenu(null);
        menuRepository.save(menu);
        List<Menu> menus = menuRepository.findByMenu(null);
        Assert.assertEquals(2, menus.size());
        Assert.assertEquals(2, menus.get(0).getItems().size());
    }
    
    

}
