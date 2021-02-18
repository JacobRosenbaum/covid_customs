package learn.covid_customs.data;

import learn.covid_customs.models.Order;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class OrderJdbcTemplateRepositoryTest {

    @Autowired
    OrderJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Order> actual = repository.findAll();
        assertNotNull(actual);
        assertNotNull(actual.get(0).getTotal());
        assertNotNull(actual.get(0).getCustomer());
        assertTrue(actual.get(0).getMasks().size() > 0);
        assertTrue(actual.size() >= 3);
    }


}