package learn.covid_customs.data.mappers;

import org.springframework.jdbc.core.RowMapper;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TotalCostMapper implements RowMapper<BigDecimal> {
    @Override
    public BigDecimal mapRow(ResultSet resultSet, int i) throws SQLException {
        BigDecimal total;
        total = resultSet.getBigDecimal("total");
        return total;
    }
}
