package learn.covid_customs.data;

import learn.covid_customs.data.mappers.CustomerMapper;
import learn.covid_customs.data.mappers.OrderMapper;
import learn.covid_customs.models.Customer;
import learn.covid_customs.models.Order;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class CustomerJdbcTemplateRepository implements CustomerRepository{
    private final JdbcTemplate jdbcTemplate;

    public CustomerJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Customer> findAll() {
        final String sql = "select" +
                " c.customer_id," +
                " c.first_name," +
                " c.last_name," +
                " c.email," +
                " ua.user_password," +
                " c.address," +
                " c.phone," +
                " c.user_role" +
                " from customer c" +
                " inner join user_account ua on c.customer_id = ua.customer_id;";

        List<Customer> customers = jdbcTemplate.query(sql, new CustomerMapper());

        return customers;
    }

    @Override
    public Customer findById(int customerId) {
        final String sql = "select" +
                " c.customer_id," +
                " c.first_name," +
                " c.last_name," +
                " c.email," +
                " ua.user_password," +
                " c.address," +
                " c.phone," +
                " c.user_role" +
                " from customer c" +
                " inner join user_account ua on c.customer_id = ua.customer_id" +
                " where c.customer_id = ?;";

        Customer customer = jdbcTemplate.query(sql, new CustomerMapper(), customerId).stream()
                .findAny().orElse(null);

        return customer;
    }

    @Override
    @Transactional
    public Customer add(Customer customer) {
        final String customerSql = "insert into customer (first_name, last_name, email, address, phone, user_role) " +
                                "values (?,?,?,?,?,?);";
        final String accountSql = "insert into user_account (customer_id, username, user_password) " +
                                    "values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(customerSql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, customer.getFirstName());
            ps.setString(2, customer.getLastName());
            ps.setString(3, customer.getEmail());
            ps.setString(4, customer.getAddress());
            ps.setString(5, customer.getPhone());
            ps.setString(6, customer.getRole());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        customer.setCustomerId(keyHolder.getKey().intValue());

        jdbcTemplate.update(connection -> {
           PreparedStatement ps = connection.prepareStatement(accountSql);
           ps.setInt(1, customer.getCustomerId());
           ps.setString(2, customer.getEmail());
           ps.setString(3, customer.getPassword());
           return ps;
        });

        return customer;
    }

    @Override
    @Transactional
    public boolean update(Customer customer) {
        final String accountSql = "update user_account set " +
                "username = ?, " +
                "user_password = ? " +
                "where customer_id = ?;";
        if (jdbcTemplate.update(accountSql, customer.getEmail(), customer.getPassword(), customer.getCustomerId()) <= 0) {
            return false; //user not found
        }

        final String customerSql = "update customer set " +
                "first_name = ?, " +
                "last_name = ?, " +
                "email = ?, " +
                "phone = ?, " +
                "address = ?, " +
                "user_role = ? " +
                "where customer_id = ?;";
        return jdbcTemplate.update(customerSql,
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getAddress(),
                customer.getRole(),
                customer.getCustomerId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int customerId) {

        final String sql = "select " +
                "o.order_id, " +
                "c.email, " +
                "sum(om.quantity*m.cost) as total, " +
                "o.purchased, " +
                "o.purchase_date " +
                "from orders o " +
                "inner join customer c on o.customer_id = c.customer_id " +
                "inner join order_mask om on o.order_id = om.order_id " +
                "inner join mask m on om.mask_id = m.mask_id " +
                "where c.customer_id = ? " +
                "group by order_id;";

        List<Order> customerOrders = jdbcTemplate.query(sql, new OrderMapper(), customerId);

        for (Order order: customerOrders) {
            jdbcTemplate.update("delete from order_mask where order_id = ?;", order.getOrderId());
        }
        jdbcTemplate.update("delete from user_account where customer_id = ?;", customerId);
        //jdbcTemplate.update("delete from order_mask where customer_id = ?;", customerId);
        jdbcTemplate.update("delete from orders where customer_id = ?;", customerId);
        return jdbcTemplate.update("delete from customer where customer_id = ?;", customerId) > 0;

    }

}
