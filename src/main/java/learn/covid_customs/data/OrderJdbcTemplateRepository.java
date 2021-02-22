package learn.covid_customs.data;

import learn.covid_customs.data.mappers.*;
import learn.covid_customs.models.Customer;
import learn.covid_customs.models.Mask;
import learn.covid_customs.models.MaskOrders;
import learn.covid_customs.models.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository
public class OrderJdbcTemplateRepository implements OrderRepository {
    private final JdbcTemplate jdbcTemplate;

    public OrderJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    @Transactional
    public List<Order> findAll() {
        final String sql = "select " +
                "o.order_id, " +
                "o.customer_id, " +
                "sum(om.quantity*m.cost) as total, " +
                "o.purchased, " +
                "o.purchase_date " +
                "from orders o " +
                "inner join customer c on o.customer_id = c.customer_id " +
                "inner join order_mask om on o.order_id = om.order_id " +
                "inner join mask m on om.mask_id = m.mask_id " +
                "group by order_id;";

        List<Order> orders = jdbcTemplate.query(sql, new OrderMapper());

        for (Order o : orders) {
            addMasks(o);
            addCustomer(o);
        }

        return orders;
    }

    // save to orderHistory function delete from order

    @Override
    @Transactional
    public List<Order> findByCustomerId(int customerId) {
        final String sql = "select " +
                "o.order_id, " +
                "o.customer_id, " +
                "sum(om.quantity*m.cost) as total, " +
                "o.purchased, " +
                "o.purchase_date " +
                "from orders o " +
                "inner join customer c on o.customer_id = c.customer_id " +
                "inner join order_mask om on o.order_id = om.order_id " +
                "inner join mask m on om.mask_id = m.mask_id " +
                "where o.customer_id = ? " +
                "group by order_id;";
        List<Order> orders = jdbcTemplate.query(sql, new OrderMapper(), customerId);
        if (orders.size() == 0) {
            return null;
        }
        for (Order o : orders) {
            addMasks(o);
            addCustomer(o);
        }
        return orders;
    }

    @Override
    @Transactional
    public Order findById(int orderId) {
        final String sql = "select " +
                "o.order_id, " +
                "o.customer_id, " +
                "sum(om.quantity*m.cost) as total, " +
                "o.purchased, " +
                "o.purchase_date " +
                "from orders o " +
                "inner join customer c on o.customer_id = c.customer_id " +
                "inner join order_mask om on o.order_id = om.order_id " +
                "inner join mask m on om.mask_id = m.mask_id " +
                "where o.order_id = ? " +
                "group by order_id;";
        Order order = jdbcTemplate.query(sql, new OrderMapper(), orderId)
                .stream().findAny().orElse(null);
        if (order == null) {
            return null;
        }

        addMasks(order);
        addCustomer(order);
        return order;
    }

    @Override
    @Transactional
    public Order add(Order order) {
        final String sql = "insert into orders (customer_id, purchased, purchase_date) values (?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, order.getCustomer().getCustomerId());
            ps.setBoolean(2, order.isPurchased());
            ps.setDate(3, order.getPurchaseDate() == null ? null : Date.valueOf(order.getPurchaseDate()));
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }
        order.setOrderId(keyHolder.getKey().intValue());
        if (order.getMasks().size() != 0) {
            addingToOrderMaskTable(order);
        }
        return order;
    }

    @Override
    @Transactional
    public boolean update(Order order) {
        final String sql = "update orders set "
                + "customer_id = ?, "
                + "purchased = ?, "
                + "purchase_date = ? "
                + "where order_id = ?;";
        if (jdbcTemplate.update(sql, order.getCustomer().getCustomerId(),
                order.isPurchased(),
                order.getPurchaseDate(), order.getOrderId()) <= 0) {
            return false;
        }
        deletingOrderMask(order.getOrderId());
        addingToOrderMaskTable(order);
        return true;
    }

    @Override
    @Transactional
    public boolean deleteById(int orderId) {
        deletingOrderMask(orderId);
        final String sql = "delete from orders where order_id = ?;";
        return jdbcTemplate.update(sql, orderId) > 0;
    }

    private void addMasks(Order order) {
        final String sql = "select * from order_mask om " +
                "inner join mask m on om.mask_id = m.mask_id " +
                "where order_id = ?;";
        List<Mask> masks = jdbcTemplate.query(sql, new MaskMapper(), order.getOrderId());
        List<MaskOrders> maskOrdersList = new ArrayList<>();
        for (Mask mask : masks) {
            MaskOrders maskOrder= new MaskOrders(mask.getMaskId(), findQuantity(mask.getMaskId(), order.getOrderId()));
            maskOrdersList.add(maskOrder);
        }
        order.setMasks(maskOrdersList);
    }

    private int findQuantity(int maskId, int orderId) {
        final String sql = "select * from order_mask om " +
                "where mask_id = ? && order_id = ?;";
        return jdbcTemplate.query(sql, new QuantityMapper(), maskId, orderId).stream().findAny().orElse(0);
    }

    private void addCustomer(Order order) {
        final String sql = "select c.customer_id, c.first_name, c.last_name, c.email, ua.user_password, " +
                "c.address_line, c.city, c.state, c.zip_code, c.phone, c.user_role " +
                "from customer c " +
                "inner join user_account ua on c.customer_id = ua.customer_id " +
                "where c.customer_id = ?;";
        Customer customer = jdbcTemplate.query(sql, new CustomerMapper(), order.getCustomer().getCustomerId())
                .stream().findAny().orElse(null);
        order.setCustomer(customer);
    }

    private void deletingOrderMask(int orderId) {
        final String sql = "delete from order_mask where order_id = ?;";
        jdbcTemplate.update(sql, orderId);
    }

    private void addingToOrderMaskTable(Order order) {
        List<MaskOrders> maskOrdersList = order.getMasks();
        for (MaskOrders maskOrders : maskOrdersList) {
            addOrderMask(order.getOrderId(), maskOrders.getMaskId(), maskOrders.getQuantity());
        }
    }

    private void addOrderMask(int orderId, int maskId, int quantity) {
        final String sql = "insert into order_mask (order_id, mask_id, quantity) values (?, ?, ?);";
        jdbcTemplate.update(sql, orderId, maskId, quantity);
        //System.out.println("Adding to Table: "+ orderId + ", " +maskId + ", " + quantity );
    }

//    private void addTotal(Order order) {
//        final String sql = "";
//        BigDecimal total = jdbcTemplate.query(sql, new TotalCostMapper(), order.getOrderId()).stream()
//                            .findFirst().orElse(null);
//        order.setTotal(total);
//    }
}
