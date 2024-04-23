package com.example.application.api.browser_callables;

import com.example.application.entities.Order;
import com.example.application.repositories.OrderRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;

@BrowserCallable
@AnonymousAllowed
public class OrderBrowserCallable extends CrudRepositoryService<Order, Long, OrderRepository> {
}