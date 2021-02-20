package learn.covid_customs.models;

import lombok.*;

@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MaskOrders {
    @Getter
    @Setter
    private int maskId;

    @Getter @Setter
    private int quantity;
}
