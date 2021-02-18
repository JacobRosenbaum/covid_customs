package learn.covid_customs.domain;

import learn.covid_customs.data.OrderRepository;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class OrderServiceTest {
    @Autowired
    OrderService service;

    @MockBean
    OrderRepository repository;

    @Test
    void shouldAddOrder() {}

    @Test
    void shouldNotAddOrderIfCustomerNull() {}

    @Test
    void shouldNotAddOrderIfPurchaseDateIsInFuture() {}

    @Test
    void shouldNotAddOrderIfTotalCostIsNegative() {}

    @Test
    void shouldNotAddIfMasksIsNull() {}

    @Test
    void shouldUpdate() {}

    @Test
    void shouldNotUpdateIfNotFound() {}

    @Test
    void shouldDelete() {}

    @Test
    void shouldNotDeleteIfNotFound() {}

    @Test
    void shouldNotAddIfOrderIsNull() {}

    //May Not need the below
//    @Test
//    void shouldCalculateTotal() {}
//
//    @Test
//    void shouldNotCalculateTotalWhenDateSet() {}

}