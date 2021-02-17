package learn.covid_customs.data.mappers;

import learn.covid_customs.models.Color;
import learn.covid_customs.models.Mask;
import learn.covid_customs.models.Material;
import learn.covid_customs.models.Style;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class MaskMapper implements RowMapper<Mask> {

    @Override
    public Mask mapRow(ResultSet resultSet, int i) throws SQLException {
        Mask mask = new Mask();
        mask.setMaskId(resultSet.getInt("mask_id"));
        mask.setMaterial(Material.findByName(resultSet.getString("material")));
        mask.setStyle(Style.findByName(resultSet.getString("style")));
        mask.setCost(resultSet.getBigDecimal("cost"));
        mask.setCustom(resultSet.getBoolean("is_custom"));
        mask.setImage(resultSet.getString("image_link"));

        return mask;
    }

}
