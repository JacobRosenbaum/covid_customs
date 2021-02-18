package learn.covid_customs.data;

import learn.covid_customs.data.mappers.*;
import learn.covid_customs.models.Customer;
import learn.covid_customs.models.Mask;
import learn.covid_customs.models.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;

@Repository
public class OrderJdbcTemplateRepository implements OrderRepository{
    private final JdbcTemplate jdbcTemplate;

    public OrderJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    @Transactional
    public List<Order> findAll() {
        final String sql = "select " +
                "o.order_id, " +
                "c.customer_id, " +
                "sum(om.quantity*m.cost) as total, " +
                "o.purchased, " +
                "o.purchase_date " +
                "from orders o " +
                "inner join customer c on o.customer_id = c.customer_id " +
                "inner join order_mask om on o.order_id = om.order_id " +
                "inner join mask m on om.mask_id = m.mask_id " +
                "group by order_id;";

        List<Order> orders = jdbcTemplate.query(sql, new OrderMapper());

        for (Order o: orders) {
            addMasks(o); //not doing anything currently
            addCustomer(o);
        }

        return orders;
    }

    // save to orderHistory function delete from order

    @Override
    @Transactional
    public List<Order> findByCustomerId(int customerId) {
        return null;
    }

    @Override
    @Transactional
    public Order findById(int orderId) {
        return null;
    }

    @Override
    @Transactional
    public Order add(Order order) {
        return null;
    }

    @Override
    @Transactional
    public boolean update(Order order) {
        return false;
    }

    @Override
    @Transactional
    public boolean deleteById(int orderId) {
        return false;
    }

    private void addMasks(Order order) {
        final String sql = "select * from order_mask where order_id = ?";
    }

    private void addCustomer(Order order) {
        final String sql = "select * from customer where customer_id = ?";
        Customer customer = jdbcTemplate.query(sql, new CustomerMapper(), order.getCustomer().getCustomerId()).stream().findAny().orElse(null);
        order.setCustomer(customer);
    }

//    private void addTotal(Order order) {
//        final String sql = "";
//        BigDecimal total = jdbcTemplate.query(sql, new TotalCostMapper(), order.getOrderId()).stream()
//                            .findFirst().orElse(null);
//        order.setTotal(total);
//    }
}
