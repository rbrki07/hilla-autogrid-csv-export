package com.example.application.services;

import java.util.List;

import com.example.application.entities.Order;
import com.example.application.repositories.OrderRepository;
import com.vaadin.hilla.crud.JpaFilterConverter;
import com.vaadin.hilla.crud.filter.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    JpaFilterConverter jpaFilterConverter;

    public List<Order> findAllByFilter(Filter filter) {
        Specification<Order> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, Order.class)
                : Specification.anyOf();
        return orderRepository.findAll(spec);
    }
}