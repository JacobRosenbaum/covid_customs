package learn.covid_customs.data;

import learn.covid_customs.data.mappers.ColorMapper;
import learn.covid_customs.data.mappers.MaskMapper;
import learn.covid_customs.models.Mask;
import learn.covid_customs.models.Material;
import learn.covid_customs.models.Style;
import learn.covid_customs.models.Color;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class MaskJdbcTemplateRepository implements MaskRepository {

    private final JdbcTemplate jdbcTemplate;

    public MaskJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Mask> findAll() {
        final String sql = "select mask_id, " +
                "material, " +
                "style, " +
                "cost, " +
                "is_custom, " +
                "image_link, " +
                "is_deleted "+
                "from mask " +
                "where is_deleted = ?;";
        List<Mask> masks = jdbcTemplate.query(sql, new MaskMapper(), false);

        for (Mask m : masks) {
            addColors(m);
        }
        return masks;
    }

    @Override
    public List<Mask> findAllAdmin() {
        final String sql = "select mask_id, " +
                "material, " +
                "style, " +
                "cost, " +
                "is_custom, " +
                "image_link, " +
                "is_deleted "+
                "from mask;";
        List<Mask> masks = jdbcTemplate.query(sql, new MaskMapper());

        for (Mask m : masks) {
            addColors(m);
        }
        return masks;
    }

    @Override
    public Mask findById(int maskId) {
        final String sql = "select mask_id, " +
                "material, " +
                "style, " +
                "cost, " +
                "is_custom, " +
                "image_link, " +
                "is_deleted "+
                "from mask " +
                "where mask_id = ?;";

        Mask result = jdbcTemplate.query(sql, new MaskMapper(), maskId).stream()
                .findAny().orElse(null);

        if (result != null) {
            addColors(result);
        }

        return result;
    }

    @Override
    public List<Mask> findByColor(Color color) {
        final String sql = "select m.mask_id, " +
                "m.material, " +
                "m.style, " +
                "m.cost, " +
                "m.is_custom, " +
                "m.image_link, " +
                "m.is_deleted "+
                "from mask m " +
                "inner join color c on c.mask_id = m.mask_id " +
                "where c.color_name = ? and is_deleted = ?;";

        List<Mask> masks = jdbcTemplate.query(sql, new MaskMapper(), color.getName(), false);

        for (Mask m : masks) {
            addColors(m);
        }
        return masks;
    }

    @Override
    public List<Mask> findByStyle(Style style) {
        final String sql = "select mask_id, " +
                "material, " +
                "style, " +
                "cost, " +
                "is_custom, " +
                "image_link, " +
                "is_deleted "+
                "from mask " +
                "where style = ? and is_deleted = ?;";
        List<Mask> masks = jdbcTemplate.query(sql, new MaskMapper(), style.getName(), false);

        for (Mask m : masks) {
            addColors(m);
        }
        return masks;
    }


    @Override
    public List<Mask> findByMaterial(Material material) {
        final String sql = "select mask_id, " +
                "material, " +
                "style, " +
                "cost, " +
                "is_custom, " +
                "image_link, " +
                "is_deleted "+
                "from mask " +
                "where material = ? and is_deleted = ?;";
        List<Mask> masks = jdbcTemplate.query(sql, new MaskMapper(), material.getName(), false);

        for (Mask m : masks) {
            addColors(m);
        }
        return masks;
    }

    @Override
    @Transactional
    public Mask add(Mask mask) {
        final String maskSql = "insert into mask (material, style, cost, is_custom, image_link, is_deleted) "
                + " values (?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(maskSql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, mask.getMaterial().getName());
            ps.setString(2, mask.getStyle().getName());
            ps.setBigDecimal(3, mask.getCost());
            ps.setBoolean(4, mask.isCustom());
            ps.setString(5, mask.getImage());
            ps.setBoolean(6, mask.isDeleted());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        mask.setMaskId(keyHolder.getKey().intValue());

        final String colorSql = "insert into color (mask_id, color_id, color_name) "
                + " values (?,?,?);";

        for (Color c : mask.getColors()) {
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(colorSql);
                ps.setInt(1, mask.getMaskId());
                ps.setInt(2, c.getValue());
                ps.setString(3, c.getName());
                return ps;
            });
        }

        return mask;
    }

    @Override
    @Transactional
    public boolean update(Mask mask) {
        jdbcTemplate.update("delete from color where mask_id = ?", mask.getMaskId());

        final String colorSql = "insert into color (mask_id, color_id, color_name) "
                + " values (?,?,?);";

        for (Color c : mask.getColors()) {
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(colorSql);
                ps.setInt(1, mask.getMaskId());
                ps.setInt(2, c.getValue());
                ps.setString(3, c.getName());
                return ps;
            });
        }

        final String maskSql = "update mask set "
                + "material = ?, "
                + "style = ?, "
                + "cost = ?, "
                + "is_custom = ?, "
                + "image_link = ?, "
                + "is_deleted = ? "
                + "where mask_id = ?;";
        return jdbcTemplate.update(maskSql,
                mask.getMaterial().getName(),
                mask.getStyle().getName(),
                mask.getCost(),
                mask.isCustom(),
                mask.getImage(),
                mask.isDeleted(),
                mask.getMaskId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int maskId) {
//        jdbcTemplate.update("delete from color where mask_id = ?", maskId);
//        jdbcTemplate.update("delete from order_mask where mask_id = ?", maskId);
//        return jdbcTemplate.update("delete from mask where mask_id = ?", maskId) > 0;
        final String maskSql = "update mask set "
                + "is_deleted = true "
                + "where mask_id = ? and is_deleted= false;";
        return jdbcTemplate.update(maskSql,
                maskId) > 0;
    }

    private void addColors(Mask mask) {
        final String sql = "select color_id, color_name "
                + "from color "
                + "where mask_id = ?";

        List<Color> colors = jdbcTemplate.query(sql, new ColorMapper(), mask.getMaskId());
        mask.setColors(colors);
    }
}
