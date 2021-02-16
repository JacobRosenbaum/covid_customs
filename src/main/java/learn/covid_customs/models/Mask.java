package learn.covid_customs.models;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Mask {
    @Getter
    @Setter
    private int maskId;
    @Getter
    @Setter
    @NotNull
    private Material material;
    @Getter
    @Setter
    @NotNull
    private Style style;
    @Getter
    @Setter
    @NotNull
    @NotEmpty
    private List<Color> colors;
    @Getter
    @Setter
    @Min(0)
    private BigDecimal cost;
    @Getter
    @Setter
    private boolean isCustom;
    @Getter
    @Setter
    @NotNull
    private String image;

}
