package learn.covid_customs.data;

import learn.covid_customs.models.Order;

import java.util.List;

public interface OrderRepository {

    List<Order> findAll();

    List<Order> findByCustomerId(int customerId);

    Order findById(int orderId);

    Order add(Order order);

    boolean update(Order order);

    boolean deleteById(int orderId);
}
