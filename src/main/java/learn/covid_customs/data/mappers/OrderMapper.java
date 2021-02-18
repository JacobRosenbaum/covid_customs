package learn.covid_customs.data.mappers;

import learn.covid_customs.data.CustomerJdbcTemplateRepository;
import learn.covid_customs.models.Customer;
import learn.covid_customs.models.Order;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

public class OrderMapper implements RowMapper<Order> {

    @Override
    public Order mapRow(ResultSet resultSet, int i) throws SQLException {
        Order order = new Order();
        Customer customer = new Customer();
        order.setCustomer(customer);
        order.setOrderId(resultSet.getInt("order_id"));
        order.getCustomer().setCustomerId(resultSet.getInt("customer_id"));
        order.setTotal(resultSet.getBigDecimal("total"));
        order.setPurchased(resultSet.getBoolean("purchased"));
        if (resultSet.getDate("purchase_date") != null) {
            order.setPurchaseDate(resultSet.getDate("purchase_date").toLocalDate());
        } else {
            order.setPurchaseDate(null);
        }
        return order;

        //modify sql table to be varchar instead of date?
    }
}
