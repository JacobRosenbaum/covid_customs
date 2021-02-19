package learn.covid_customs.models;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
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
   // @Positive   //includes zero? make test
    private int orderId;

    @Getter
    @Setter
    @NotNull(message = "Customer cannot be null.")
    private Customer customer;

    @Getter
    @Setter
    private HashMap<Mask, Integer> masks;

    @Getter
    @Setter
    @NotNull(message = "Total cost cannot be null")
    @Min(value = 0, message = "Total cost must be zero or greater.")
    private BigDecimal total;

    @Getter
    @Setter
    private boolean purchased;

    @Getter
    @Setter
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @PastOrPresent(message = "Purchase date must be in the past.")
    private LocalDate purchaseDate;

}
