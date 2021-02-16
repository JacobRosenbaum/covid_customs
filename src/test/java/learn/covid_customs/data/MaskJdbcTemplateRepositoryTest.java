package learn.covid_customs.data;

import learn.covid_customs.models.Mask;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MaskJdbcTemplateRepositoryTest {

    @Autowired
    MaskJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllMasks() {
        List<Mask> masks = repository.findAll();
        assertNotNull(masks);
        assertTrue(masks.size() > 0);
    }


}