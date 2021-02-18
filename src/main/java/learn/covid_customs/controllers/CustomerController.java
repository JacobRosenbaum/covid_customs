package learn.covid_customs.controllers;

import learn.covid_customs.domain.CustomerService;
import learn.covid_customs.domain.Result;
import learn.covid_customs.models.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> findAll() {
        return customerService.findAll();
    }


    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> findById(@PathVariable int customerId) {
        Customer customer = customerService.findById(customerId);

        if (customer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(customer);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody @Valid Customer customer) {
        Result<Customer> result = customerService.add(customer);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<Object> update(@PathVariable int customerId, @RequestBody @Valid Customer customer) {
        if (customer.getCustomerId() != customerId) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Customer> result = customerService.update(customer);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteById(@PathVariable int customerId) {
        if (customerService.deleteById(customerId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}