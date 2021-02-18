package learn.covid_customs.models;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Getter
    @Setter
    @Positive   //includes zero? make test
    private int orderId;

    @Getter
    @Setter
    @NotNull
    private Customer customer;

    @Getter
    @Setter
    @NotNull
    private HashMap<Mask, Integer> masks;

    @Getter
    @Setter
    @NotNull
    @Min(value = 0, message = "Total must be zero or greater")
    private BigDecimal total;

    @Getter
    @Setter
    private boolean purchased;

    @Getter
    @Setter
    private LocalDate purchaseDate;

}
