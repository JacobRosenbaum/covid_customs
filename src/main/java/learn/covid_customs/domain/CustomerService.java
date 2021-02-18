package learn.covid_customs.domain;

import learn.covid_customs.data.CustomerRepository;
import learn.covid_customs.models.Customer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CustomerService {
    private final CustomerRepository repository;

    public List<Customer> findAll() {
        return repository.findAll();
    }

    public Customer findById(int customerId) {
        return repository.findById(customerId);
    }

    public Result<Customer> add(Customer customer) {
        return null;
    }

    public Result<Customer> update(Customer customer) {
        return null;
    }

    public boolean deleteById(int customerId) {
        return false;
    }
}
