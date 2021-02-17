package learn.covid_customs.data;

import learn.covid_customs.models.Mask;
import learn.covid_customs.models.Material;
import learn.covid_customs.models.Style;
import learn.covid_customs.models.Color;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MaskRepository {
    List<Mask> findAll();

    Mask findById(int maskId);

    List<Mask> findByColor(Color color);

    List<Mask> findByStyle(Style style);

    List<Mask> findByMaterial(Material material);

    @Transactional
    Mask add(Mask mask);

    @Transactional
    boolean update(Mask mask);

    @Transactional
    boolean deleteById(int maskId);
}
