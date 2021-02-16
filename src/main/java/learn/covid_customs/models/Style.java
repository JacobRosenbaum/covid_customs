package learn.covid_customs.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum Style {
    ATHLETIC(1, "Athletic"),
    OVER_EAR(2, "Over the Ear"),
    WRAP(3, "Wrap");

    @Getter private final int value;
    @Getter private final String name;

}
