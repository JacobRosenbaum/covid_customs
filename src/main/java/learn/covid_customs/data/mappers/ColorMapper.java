package learn.covid_customs.data.mappers;

import learn.covid_customs.models.Color;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ColorMapper implements RowMapper<Color> {

    @Override
    public Color mapRow(ResultSet resultSet, int i) throws SQLException {

        return Color.findByName(resultSet.getString("color_name"));
    }
}