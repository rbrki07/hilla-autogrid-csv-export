package com.example.application.api.rest;

import com.example.application.entities.Order;
import com.example.application.services.OrderService;
import com.vaadin.hilla.crud.filter.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ExportController {

    @Autowired
    OrderService orderService;

    @PostMapping("/export")
    public ResponseEntity<Resource> download(@RequestBody Filter filter) {
        List<Order> orders = orderService.findAllByFilter(filter);
        String csv = orders.stream().map(Order::toCSV).collect(Collectors.joining("\n"));
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"export.csv").body(new ByteArrayResource(csv.getBytes()));
    }
}
