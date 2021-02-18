package learn.covid_customs.data;

import learn.covid_customs.models.Customer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CustomerJdbcTemplateRepositoryTest {

    @Autowired
    CustomerJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Customer> actual = repository.findAll();
        assertNotNull(actual);
        assertTrue(actual.size() > 2);
        assertEquals("ADMIN", actual.get(0).getRole());
    }

    @Test
    void shouldFindById() {
        Customer actual = repository.findById(1);

        assertNotNull(actual);
        assertEquals("ADMIN", actual.getRole());

    }

    @Test
    void shouldAdd() {
        Customer actual = repository.add(createValidCustomer());

        assertNotNull(actual);
        assertEquals("ADMIN", actual.getRole());
    }

    @Test
    void shouldUpdate() {
        Customer customer = createValidCustomer();
        customer.setCustomerId(2);
        customer.setEmail("test@update.com");
        assertTrue(repository.update(customer));
        assertEquals("ADMIN", repository.findById(2).getRole());
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(3));
        assertNull(repository.findById(3));
    }



    private Customer createValidCustomer() {
        Customer customer = new Customer();
        customer.setFirstName("test");
        customer.setLastName("testing");
        customer.setEmail("test@test.com");
        customer.setPassword("test password");
        customer.setAddress("test address");
        customer.setPhone("1-800-testing");
        customer.setRole("ADMIN");
        return customer;
    }
}