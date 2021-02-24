package learn.covid_customs.data;

import learn.covid_customs.models.Order;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository {

    @Transactional
    List<Order> findAll();

    @Transactional
    List<Order> findByCustomerId(int customerId);

    @Transactional
    Order findById(int orderId);

    @Transactional
    Order add(Order order);

    @Transactional
    Order update(Order order);

    @Transactional
    boolean deleteById(int orderId);
}
