package learn.covid_customs.data;

import learn.covid_customs.models.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
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

    @Test
    void shouldNotFindByCustomerId(){
        List<Order> actual = repository.findByCustomerId(100);
        assertNull(actual);
    }

    @Test
    void shouldFindByCustomerId(){
        List<Order> actual = repository.findByCustomerId(3);
        assertNotNull(actual);
        assertNotNull(actual.get(0).getTotal());
        assertNotNull(actual.get(0).getCustomer());
        assertTrue(actual.get(0).getMasks().size() > 0);
        assertTrue(actual.size() >= 1);
    }

    @Test
    void shouldFindOrderById(){
        Order actual = repository.findById(3);
        assertNotNull(actual);
        assertNotNull(actual.getTotal());
        assertNotNull(actual.getCustomer());
        assertTrue(actual.getMasks().size() > 0);
        assertEquals(new BigDecimal("20.00"), actual.getTotal());
    }

    @Test
    void shouldNotFindOrderById(){
        Order actual = repository.findById(300);
        assertNull(actual);
    }

    @Test
    void shouldAdd(){
        Order actual = repository.add(makeOrder());
        assertNotNull(actual);
        assertEquals(5,actual.getOrderId());
        Order actualFind = repository.findById(5);
        assertEquals(actualFind.getMasks().size(), 2);
    }

    @Test
    void shouldUpdate(){
        Order order= makeOrder();
        order.setOrderId(1);
        assertTrue(repository.update(order));
        Order actualFind = repository.findById(1);
        assertEquals(actualFind.getMasks().size(), 2);
    }

    @Test
    void shouldNotUpdate(){
        Order order= makeOrder();
        order.setOrderId(100);
        assertFalse(repository.update(order));
    }

    @Test
    void shouldDelete(){
        assertTrue(repository.deleteById(2));
        assertNull(repository.findById(2));
    }

    @Test
    void shouldNotDelete(){
        assertFalse(repository.deleteById(100));
    }


    private Order makeOrder(){
        Customer customer= new Customer();
        customer.setCustomerId(1);
        Order order= new Order();
        order.setMasks(maskMap());
        order.setCustomer(customer);
        order.setPurchased(false);
        return order;
    }

    private List<MaskOrders> maskMap(){
        MaskOrders mask1= new MaskOrders(makeMask(1), 3);
        MaskOrders mask2= new MaskOrders(makeMask(2), 4);
        return List.of(mask1, mask2);
    }

    private Mask makeMask(int maskId) {
        List<Color> colors = new ArrayList<>();
        colors.add(Color.VIOLET);
        colors.add(Color.GREEN);

        Mask mask = new Mask();
        mask.setMaskId(maskId);
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