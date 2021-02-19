package learn.covid_customs.domain;

import learn.covid_customs.data.CustomerRepository;
import learn.covid_customs.models.Customer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CustomerServiceTest {
    @Autowired
    CustomerService service;

    @MockBean
    CustomerRepository repository;

    @Test
    void shouldAddOrder() {
        Customer customerIn = makeCustomer();
        Customer customerOut = makeCustomer();
        customerOut.setCustomerId(4);
        customerOut.setRole("USER");

        when(repository.findByEmail(customerIn.getEmail())).thenReturn(null);
        when(repository.add(customerIn)).thenReturn(customerOut);
        Result<Customer> actual = service.add(customerIn);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(customerOut, actual.getPayload());
    }

    @Test
    void shouldNotAddNull() {
        Result<Customer> actual = service.add(null);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Customer cannot be null.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddNullFields() {
        Result<Customer> result = new Result<>();

        //firstname
        Customer customer = makeCustomer();
        customer.setFirstName(null);
        result = service.add(customer);
        assertEquals("First name required", result.getMessages().get(0));

        //last name
        customer = makeCustomer();
        customer.setLastName(null);
        result = service.add(customer);
        assertEquals("Last name required", result.getMessages().get(0));

        //Email
        customer = makeCustomer();
        customer.setEmail(null);
        result = service.add(customer);
        assertEquals(1, result.getMessages().size());
        assertEquals("Email required", result.getMessages().get(0));

        //Password
        customer = makeCustomer();
        customer.setPassword(null);
        result = service.add(customer);
        assertEquals(1, result.getMessages().size());
        assertEquals("Password required", result.getMessages().get(0));

        //address
        customer = makeCustomer();
        customer.setAddress(null);
        result = service.add(customer);
        assertEquals("Address required", result.getMessages().get(0));

        //phone
        customer = makeCustomer();
        customer.setPhone(null);
        result = service.add(customer);
        assertEquals("Phone number required", result.getMessages().get(0));
    }

    @Test
    void shouldNotAddInvalidEmail() {
        Result<Customer> result = new Result<>();

        Customer customer = makeCustomer();
        customer.setEmail("invalid email");
        result = service.add(customer);
        assertEquals("Invalid Email", result.getMessages().get(0));
    }

    @Test
    void shouldNotAddDuplicateEmail() {
        Customer customer = makeCustomer();
        when(repository.findByEmail("email@email.com")).thenReturn(customer);
        Result<Customer> result = service.add(customer);
        assertEquals("Email already in use", result.getMessages().get(0));
    }

    @Test
    void shouldNotAddInvalidPassword() {
        Result<Customer> result = new Result<>();

        Customer customer = makeCustomer();
        customer.setPassword("password");
        result = service.add(customer);
        assertEquals("password must be 8 characters long and contain a digit, a letter, and a non-digit/non-letter", result.getMessages().get(0));
    }

    @Test
    void shouldUpdate() {
        Customer customerIn = makeCustomer();
        customerIn.setCustomerId(4);
        when(repository.update(customerIn)).thenReturn(true);
        Result<Customer> actual = service.update(customerIn);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(customerIn, actual.getPayload());
    }

    @Test
    void shouldNotUpdateIfNotFound() {
        Customer customerIn = makeCustomer();
        customerIn.setCustomerId(999);
        when(repository.update(customerIn)).thenReturn(false);
        Result<Customer> actual = service.update(customerIn);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
        assertEquals("Customer ID 999 not found", actual.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateIfIdNotSet() {
        Customer customerIn = makeCustomer();
        Result<Customer> actual = service.update(customerIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Customer Id must be set to update a customer.", actual.getMessages().get(0));
    }

    @Test
    void shouldDelete() {
        when(repository.deleteById(3)).thenReturn(true);
        assertTrue(service.deleteById(3));
    }

    @Test
    void shouldNotDeleteIfNotFound() {
        when(repository.deleteById(300)).thenReturn(false);
        assertFalse(service.deleteById(300));
    }

    private Customer makeCustomer() {
        Customer customer = new Customer();
        customer.setFirstName("firstName");
        customer.setLastName("lastName");
        customer.setEmail("email@email.com");
        customer.setPassword("password1234!");
        customer.setAddress("address");
        customer.setPhone("phone");
        return customer;
    }


}