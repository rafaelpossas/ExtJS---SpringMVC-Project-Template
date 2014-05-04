/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.br.helpdesk.integration;

import com.br.helpdesk.controller.CategoryController;
import com.br.helpdesk.controller.TicketController;
import com.br.helpdesk.repository.CategoryRepository;
import com.br.helpdesk.repository.TicketRepository;
import com.br.helpdesk.service.CategoryService;
import com.br.helpdesk.service.TicketService;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.hamcrest.Matchers;
import org.json.JSONArray;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
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
@DatabaseSetup("TicketData.xml")
public class TicketIntegration {
    
    private MockMvc mockMvc;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketService ticketService;

    @InjectMocks
    private TicketController ticketController;
    
    
    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ticketService.setRepository(ticketRepository);
        ticketController.setTicketService(ticketService);
        mockMvc = MockMvcBuilders.standaloneSetup(ticketController).build();

    }
    
    @Test
    public void testTicketGetController() throws Exception {
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/ticket"))
                .andExpect(MockMvcResultMatchers.status().isOk()).andExpect(MockMvcResultMatchers.content()
                        .contentType(IntegrationUtils.APPLICATION_JSON_UTF8)).andReturn();
        JSONArray jSONArray = new JSONArray(mvcResult.getResponse().getContentAsString());
        System.out.println(mvcResult.getResponse().getContentAsString());
        Assert.assertThat(jSONArray.length(), Matchers.is(4));
    }
}
