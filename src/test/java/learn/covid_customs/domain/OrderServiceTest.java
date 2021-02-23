package learn.covid_customs.domain;

import learn.covid_customs.data.OrderRepository;
import learn.covid_customs.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class OrderServiceTest {
    @Autowired
    OrderService service;

    @MockBean
    OrderRepository repository;

    @Test
    void shouldNotAddIfNull() {
        Result<Order> actual = service.add(null);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Order cannot null.", actual.getMessages().get(0));
    }

    @Test
    void shouldAddOrder() {
        Order orderIn = makeOrder();
        Order orderOut = makeOrder();
        orderOut.setOrderId(3);

        when(repository.add(orderIn)).thenReturn(orderOut);
        Result<Order> actual = service.add(orderIn);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(orderOut, actual.getPayload());
    }

    @Test
    void shouldNotAddOrderIfCustomerNull() {
        Order orderIn = makeOrder();
        orderIn.setCustomer(null);
        Result<Order> actual = service.add(orderIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Customer cannot be null.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddOrderIfPurchaseDateIsInFuture() {
        Order orderIn = makeOrder();
        orderIn.setPurchased(true);
        orderIn.setPurchaseDate(LocalDate.now().plusDays(3));
        Result<Order> actual = service.add(orderIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Purchase date must be in the past.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddOrderIfTotalCostIsNegative() {
        Order orderIn = makeOrder();
        orderIn.setTotal(new BigDecimal("-5"));
        Result<Order> actual = service.add(orderIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Total cost must be zero or greater.", actual.getMessages().get(0));
    }

    @Test
    void shouldAddIfMasksIsEmptyHash() {
        Order orderIn = makeOrder();
        List<MaskOrders> maskMap = new ArrayList<>();
        orderIn.setMasks(maskMap);
        Order orderOut = makeOrder();
        orderOut.setMasks(maskMap);
        orderOut.setOrderId(3);
        when(repository.add(orderIn)).thenReturn(orderOut);
        Result<Order> actual = service.add(orderIn);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(orderOut, actual.getPayload());
    }

    @Test
    void shouldNotAddIfIdSet() {
        Order orderIn = makeOrder();
        orderIn.setOrderId(3);
        Result<Order> actual = service.add(orderIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("OrderId cannot be set for adding a order.", actual.getMessages().get(0));
    }

    @Test
    void shouldUpdate() {
        Order orderIn = makeOrder();
        orderIn.setOrderId(3);
        when(repository.update(orderIn)).thenReturn(true);
        Result<Order> actual = service.update(orderIn);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(orderIn, actual.getPayload());
    }

    @Test
    void shouldNotUpdateIfNotFound() {
        Order orderIn = makeOrder();
        orderIn.setOrderId(300);
        when(repository.update(orderIn)).thenReturn(false);
        Result<Order> actual = service.update(orderIn);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
        assertEquals("Mask Id 300 not found.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateIfIdNotSet() {
        Order orderIn = makeOrder();
        Result<Order> actual = service.update(orderIn);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("OrderId must be set for update a order.", actual.getMessages().get(0));
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


    //May Not need the below
//    @Test
//    void shouldCalculateTotal() {}
//
//    @Test
//    void shouldNotCalculateTotalWhenDateSet() {}

    private Order makeOrder() {
        Customer customer = new Customer();
        customer.setCustomerId(1);
        Order order = new Order();
        order.setMasks(maskMap());
        order.setCustomer(customer);
        order.setPurchased(false);
        order.setTotal(new BigDecimal(0));
        return order;
    }

    private List<MaskOrders> maskMap() {
        MaskOrders mask1 = new MaskOrders(makeMask(1), 3);
        MaskOrders mask2 = new MaskOrders(makeMask(2), 4);
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