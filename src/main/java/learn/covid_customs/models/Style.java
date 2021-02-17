package learn.covid_customs.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum Style {
    ATHLETIC(1, "Athletic"),
    OVER_EAR(2, "Over the Ear"),
    WRAP(3, "Wrap");

    @Getter
    private final int value;
    @Getter
    private final String name;

    public static Style findByValue(int value) {
        for (Style style : Style.values()) {
            if (style.getValue() == value) {
                return style;
            }
        }
        String message = String.format("No Style with value: %s.", value);
        throw new RuntimeException(message);
    }

    public static Style findByName(String name) {
        for (Style style : Style.values()) {
            if (style.getName().equalsIgnoreCase(name)) {
                return style;
            }
        }
        String message = String.format("No Style with name: %s.", name);
        throw new RuntimeException(message);
    }

}
