package learn.covid_customs.domain;


import learn.covid_customs.models.Color;
import learn.covid_customs.models.Mask;
import learn.covid_customs.models.Material;
import learn.covid_customs.models.Style;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MaskServiceTest {

    @Autowired
    MaskService service;

    @MockBean
    MaskRepository repository;

    @Test
    void shouldAdd() {
        Mask maskIn = new Mask(0, Material.COTTON, Style.OVER_EAR, listOfColors(), new BigDecimal("5.00"),
                false, "image");
        Mask maskOut = new Mask(5, Material.COTTON, Style.OVER_EAR, listOfColors(), new BigDecimal("5.00"),
                false, "image");

        when(repository.add(maskIn)).thenReturn(maskOut);

        Result<Mask> actual = service.add(maskIn);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(maskOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWhenNull() {
        Result<Mask> actual = service.add(null);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Mask cannot null.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddWhenMaskIdAbove0() {
        Mask maskIn = new Mask(1, Material.COTTON, Style.OVER_EAR, listOfColors(), new BigDecimal("5.00"),
                false, "image");
        Result<Mask> actual = service.add(maskIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("MaskId cannot be set for adding a mask.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfColorEmpty() {
        List<Color> colors = new ArrayList<>();
        Mask maskIn = new Mask(0, Material.COTTON, Style.OVER_EAR, colors, new BigDecimal("5.00"),
                false, "image");
        Result<Mask> actual = service.add(maskIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Colors cannot be empty.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfColorNull() {
        Mask maskIn = new Mask(0, Material.COTTON, Style.OVER_EAR, null, new BigDecimal("5.00"),
                false, "image");
        Result<Mask> actual = service.add(maskIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Colors cannot be null.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfMaterialNull() {
        Mask maskIn = new Mask(0, null, Style.OVER_EAR, listOfColors(), new BigDecimal("5.00"),
                false, "image");
        Result<Mask> actual = service.add(maskIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Material cannot be null.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfStyleNull() {
        Mask maskIn = new Mask(0, Material.COTTON, null, listOfColors(), new BigDecimal("5.00"),
                false, "image");
        Result<Mask> actual = service.add(maskIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Style cannot be null.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfCostNegative() {
        Mask maskIn = new Mask(0, Material.COTTON, Style.OVER_EAR, listOfColors(), new BigDecimal("-5.00"),
                false, "image");
        Result<Mask> actual = service.add(maskIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Cost cannot be a negative number.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfImageTagNull() {
        Mask maskIn = new Mask(0, Material.COTTON, Style.OVER_EAR, listOfColors(), new BigDecimal("5.00"),
                false, "image");
        Result<Mask> actual = service.add(maskIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Image cannot be null.", actual.getMessages().get(0));
    }

    @Test
    void shouldUpdate() {
        Mask maskIn = new Mask(1, Material.COTTON, Style.OVER_EAR, listOfColors(), new BigDecimal("5.00"),
                false, "image");
        when(repository.update(maskIn)).thenReturn(true);
        Result<Mask> actual = service.update(maskIn);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateIfNotFound() {
        Mask maskIn = new Mask(2, Material.COTTON, Style.OVER_EAR, listOfColors(), new BigDecimal("5.00"),
                false, "image");
        when(repository.update(maskIn)).thenReturn(false);
        Result<Mask> actual = service.update(maskIn);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
        assertEquals("Mask Id 4 not found.", actual.getMessages().get(0));
    }

    @Test
    void shouldDelete() {
        when(repository.deleteById(1)).thenReturn(true);
        assertTrue(service.deleteById(1));
    }

    @Test
    void shouldNotDeleteIfNotFound() {
        when(repository.deleteById(4)).thenReturn(false);
        assertFalse(service.deleteById(4));
    }

    public List<Color> listOfColors() {
        return List.of(Color.GREEN, Color.ORANGE);
    }

}