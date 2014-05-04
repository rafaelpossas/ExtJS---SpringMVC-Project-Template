/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.br.helpdesk.integration;

import com.br.helpdesk.controller.CategoryController;
import com.br.helpdesk.model.Category;
import com.br.helpdesk.repository.CategoryRepository;
import com.br.helpdesk.service.CategoryService;
import com.br.helpdesk.service.UserService;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import java.util.ArrayList;
import java.util.List;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.hamcrest.Matchers;
import org.json.JSONArray;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

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
@DatabaseSetup("CategoryData.xml")
public class CategoryIntegration {

    private MockMvc mockMvc;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        categoryService.setRepository(categoryRepository);
        categoryController.setCategoryService(categoryService);
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();

    }

    @Test
    public void testCategoryFindAllController() throws Exception {
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/category"))
                .andExpect(MockMvcResultMatchers.status().isOk()).andExpect(MockMvcResultMatchers.content()
                        .contentType(IntegrationUtils.APPLICATION_JSON_UTF8)).andReturn();
        JSONArray jSONArray = new JSONArray(mvcResult.getResponse().getContentAsString());
        Assert.assertThat(jSONArray.length(), Matchers.is(3));
    }

    @Test
    public void testeDeleteMissingCategory() throws Exception {
        Category category = categoryService.findOne(3L);
        category.setId(4L);
        ObjectWriter objw = new ObjectMapper().writer();
        String categoryString = objw.writeValueAsString(category);
        System.out.println(categoryString);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete("/category/4").contentType(IntegrationUtils.APPLICATION_JSON_UTF8)
                .content(categoryString)).andDo(MockMvcResultHandlers.print()).andExpect(MockMvcResultMatchers.status().isNotFound())
                .andReturn();
        //System.out.println(mvcResult.getResponse().getCon);
    }

}
