package learn.covid_customs.data;

import learn.covid_customs.data.mappers.ColorMapper;
import learn.covid_customs.data.mappers.MaskMapper;
import learn.covid_customs.models.Mask;
import learn.covid_customs.models.Material;
import learn.covid_customs.models.Style;
import learn.covid_customs.models.Color;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

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
                "image_link " +
                "from mask;";
        List<Mask> masks = jdbcTemplate.query(sql, new MaskMapper());

        for (Mask m : masks) {
            addColors(m);
        }

        return masks;
    }

    @Override
    public Mask findById(int maskId) {
        return null;
    }

    @Override
    public List<Mask> findByColor(Color color) {
        return null;
    }

    @Override
    public List<Mask> findByStyle(Style style) {
        return null;
    }

    @Override
    public List<Mask> findByMaterial(Material material) {
        return null;
    }

    @Override
    public Mask add(Mask mask) {
        return null;
    }

    @Override
    public boolean update(Mask mask) {
        return false;
    }

    @Override
    public boolean deleteById(int maskId) {
        return false;
    }

    private void addColors(Mask mask) {
        final String sql = "select color_id, color_name "
                + "from color "
                + "where mask_id = ?";

        List<Color> colors = jdbcTemplate.query(sql, new ColorMapper(), mask.getMaskId());
        mask.setColors(colors);

    }
}
