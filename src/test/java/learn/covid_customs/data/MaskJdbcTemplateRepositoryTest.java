package learn.covid_customs.data;

import learn.covid_customs.models.Color;
import learn.covid_customs.models.Mask;
import learn.covid_customs.models.Material;
import learn.covid_customs.models.Style;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MaskJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 5;

    @Autowired
    MaskJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindMasksOnlyNotDeleted() {
        List<Mask> actual = repository.findAll();
        assertNotNull(actual);
        assertTrue(actual.size() >= 2);
        assertEquals(actual.get(0).getStyle().getName(), "Athletic");
    }

    @Test
    void shouldFindAllMaskEvenDeleted(){
        List<Mask> actual = repository.findAllAdmin();
        assertNotNull(actual);
        assertTrue(actual.size() >= 3);
        assertTrue(actual.size() > repository.findAll().size());
    }


    @Test
    void shouldFindByMaskId() {
        Mask actual = repository.findById(1);
        assertNotNull(actual);
        assertEquals(actual.getStyle().getName(), "Athletic");
    }

    @Test
    void shouldNotFindMissingMaskId() {
        Mask actual = repository.findById(242919);
        assertNull(actual);
    }

    @Test
    void shouldFindByColor() {
        List<Mask> actual = repository.findByColor(Color.BLUE);
        assertNotNull(actual);
        assertTrue(actual.size() >= 1);
        assertEquals(actual.get(0).getCost().doubleValue(), 11.10);
    }

    @Test
    void shouldNotFindMissingColor() {
        List<Mask> actual = repository.findByColor(Color.INDIGO);
        assertEquals(actual.size(), 0);
    }

    @Test
    void shouldFindByStyle() {
        List<Mask> actual = repository.findByStyle(Style.ATHLETIC);
        assertNotNull(actual);
        assertTrue(actual.size() >= 2);
        assertEquals(actual.get(0).getCost().doubleValue(), 11.10);
    }

    @Test
    void shouldNotFindMissingStyle() {
        List<Mask> actual = repository.findByStyle(Style.OVER_EAR);
        assertEquals(actual.size(), 0);
    }

    @Test
    void shouldFindByMaterial() {
        List<Mask> actual = repository.findByMaterial(Material.COTTON);
        assertNotNull(actual);
        assertTrue(actual.size() >= 1);
        assertEquals(actual.get(0).getCost().doubleValue(), 11.10);
    }

    @Test
    void shouldNotFindMissingMaterial() {
        List<Mask> actual = repository.findByMaterial(Material.POLY_COT);
        assertEquals(actual.size(), 0);
    }

    @Test
    void shouldAdd() {
        Mask mask = makeMask();
        Mask actual = repository.add(mask);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getMaskId());
    }

    @Test
    void shouldUpdate() {
        List<Color> colors = new ArrayList<>();
        colors.add(Color.ORANGE);
        colors.add(Color.RED);

        Mask mask = new Mask();
        mask.setMaterial(Material.POLYESTER);
        mask.setStyle(Style.ATHLETIC);
        mask.setCustom(false);
        mask.setCost(new BigDecimal("10.75"));
        mask.setImage("Updated Image Text");
        mask.setColors(colors);
        mask.setMaskId(2);
        assertTrue(repository.update(mask));
    }

    @Test
    void shouldDelete() {
        int startSize= repository.findAll().size();
        int unchangedMaskSize= repository.findAllAdmin().size();
        assertTrue(repository.deleteById(3));
        assertFalse(repository.deleteById(3));
        assertEquals(repository.findAll().size(), startSize-1);
        assertEquals(repository.findAllAdmin().size(), unchangedMaskSize);
    }

    @Test
    void shouldNotDelete() {
        assertFalse(repository.deleteById(399999999));
    }

    private Mask makeMask() {
        List<Color> colors = new ArrayList<>();
        colors.add(Color.VIOLET);
        colors.add(Color.GREEN);

        Mask mask = new Mask();
        mask.setMaterial(Material.POLYESTER);
        mask.setStyle(Style.ATHLETIC);
        mask.setCustom(false);
        mask.setCost(new BigDecimal("12.50"));
        mask.setImage("Image Placeholder Text");
        mask.setColors(colors);
        mask.setDeleted(false);

        return mask;
    }

}