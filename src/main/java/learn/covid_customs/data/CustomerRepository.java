package learn.covid_customs.data;

import learn.covid_customs.models.Customer;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CustomerRepository {

    List<Customer> findAll();

    Customer findById(int customerId);

    Customer findByEmail(String email);

    @Transactional
    Customer add(Customer customer);

    @Transactional
    boolean update(Customer customer);

    @Transactional
    boolean deleteById(int customerId);

}
