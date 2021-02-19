package learn.covid_customs.models;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@EqualsAndHashCode
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class Mask {
    @Getter
    @Setter
    private int maskId;

    @Getter
    @Setter
    @NotNull(message = "Material cannot be null.")
    private Material material;

    @Getter
    @Setter
    @NotNull(message = "Style cannot be null.")
    private Style style;

    @Getter
    @Setter
    @NotEmpty(message = "Colors cannot be empty.")
    private List<Color> colors;

    @Getter
    @Setter
    @Min(value= 0, message = "Cost cannot be a negative number.")
    private BigDecimal cost;

    @Getter
    @Setter
    private boolean isCustom;

    @Getter
    @Setter
    @NotNull(message = "Image cannot be null.")
    private String image;

}
