package learn.covid_customs.controllers;

import learn.covid_customs.domain.OrderService;
import learn.covid_customs.domain.Result;

import learn.covid_customs.models.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> findAll() {
        return orderService.findAll();
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<Order> findByOrderId(@PathVariable int orderId) {
        Order order = orderService.findById(orderId);

        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(order);
    }

//    @GetMapping("/customer/{customerId}")
//    public ResponseEntity<Order> findByCustomerId(@PathVariable int customerId) {
//        Order order = orderService.findByCustomerId(customerId);
//
//        if (order == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return ResponseEntity.ok(order);
//    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody @Valid Order order) {
        Result<Order> result = orderService.add(order);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Object> update(@PathVariable int orderId, @RequestBody @Valid Order order) {
        if (order.getOrderId() != orderId) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Order> result = orderService.update(order);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteById(@PathVariable int orderId) {
        if (orderService.deleteById(orderId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}