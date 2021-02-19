package learn.covid_customs.domain;

import learn.covid_customs.data.CustomerJdbcTemplateRepository;
import learn.covid_customs.data.CustomerRepository;
import learn.covid_customs.models.Customer;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Service
@AllArgsConstructor
public class CustomerService implements UserDetailsService {
    private final CustomerRepository repository;
    private final PasswordEncoder encoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customer = repository.findByEmail(username);

        if (customer == null) {
            throw new UsernameNotFoundException(username + " not found.");
        }

        //there is only ever 1 authority for now as role is a String not a List
        String roleName = customer.getRole();
        List<GrantedAuthority> authority = new ArrayList<>();
        authority.add(new SimpleGrantedAuthority("ROLE_" + roleName));

        return new User(customer.getEmail(), customer.getPassword(), authority);
    }

    public List<Customer> findAll() {
        return repository.findAll();
    }

    public Customer findById(int customerId) {
        return repository.findById(customerId);
    }


    public Result<Customer> add(Customer customer) {
        Result<Customer> result = validate(customer);
        if (!result.isSuccess()) {
            return result;
        }
        if(repository.findByEmail(customer.getEmail()) != null) {
            result.addMessage("Email already in use", ResultType.INVALID);
            return result;
        }

        try {
            customer.setPassword(encoder.encode(customer.getPassword()));
        } catch (IllegalArgumentException ex) {
            result.addMessage("Password required", ResultType.INVALID);
            return result;
        }
        if (customer.getCustomerId() > 0) {
            result.addMessage("CustomerId cannot be set for adding a customer.", ResultType.INVALID);
            return result;
        }
        result.setPayload(repository.add(customer));
        return result;
    }

    public Result<Customer> update(Customer customer) {
        Result<Customer> result = validate(customer);
        if (!result.isSuccess()) {
            return result;
        }
        if (customer.getCustomerId() <= 0) {
            result.addMessage("Customer Id must be set to update a customer.", ResultType.INVALID);
            return result;
        }
        if (!repository.update(customer)) {
            String message = String.format("Customer ID %s not found", customer.getCustomerId());
            result.addMessage(message, ResultType.NOT_FOUND);
            return result;
        }
        result.setPayload(customer);
        return result;
    }

    public boolean deleteById(int customerId) {
        return repository.deleteById(customerId);
    }


    public Result<Customer> validate(Customer customer) {
        Result<Customer> result = new Result<>();
        if (customer == null) {
            result.addMessage("Customer cannot be null.", ResultType.INVALID);
            return result;
        }
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<Customer> violation : violations) {
                result.addMessage(violation.getMessage(), ResultType.INVALID);
            }
        }
        return result;
    }
}
