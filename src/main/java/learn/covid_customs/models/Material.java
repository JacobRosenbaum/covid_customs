package learn.covid_customs.models;

import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
public enum Material {
    POLY_COT(1, "50% polyester and 50% cotton"),
    POLYESTER(2, "polyester"),
    COTTON(3, "Cotton");

    @Getter
    private final int value;

    @Getter
    private final String name;

}
