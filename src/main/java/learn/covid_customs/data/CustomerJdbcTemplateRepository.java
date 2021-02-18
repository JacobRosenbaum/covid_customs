package learn.covid_customs.data;

import com.mysql.cj.xdevapi.PreparableStatement;
import learn.covid_customs.data.mappers.CustomerMapper;
import learn.covid_customs.models.Customer;
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
                " inner join user_account ua on c.email = ua.username;";

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
                " inner join user_account ua on c.email = ua.username" +
                " where customer_id = ?;";

        Customer customer = jdbcTemplate.query(sql, new CustomerMapper(), customerId).stream()
                .findAny().orElse(null);

        return customer;
    }

    @Override
    @Transactional
    public Customer add(Customer customer) {
        final String customerSql = "insert into customer (first_name, last_name, email, address, phone, user_role) " +
                                "values (?,?,?,?,?,?);";
        final String accountSql = "insert into user_account (username, user_password) " +
                                    "values (?,?);";

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
           ps.setString(1, customer.getEmail());
           ps.setString(2, customer.getPassword());
           return ps;
        });

        return customer;
    }

    @Override
    public boolean update(Customer customer) {
        return false;
    }

    @Override
    public boolean deleteById(int customerId) {
        return false;
    }
}
