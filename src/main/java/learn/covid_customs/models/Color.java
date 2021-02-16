package learn.covid_customs.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum Color {
    RED(1, "Red"),
    ORANGE(2, "Orange"),
    YELLOW(3, "Yellow"),
    GREEN(4, "Green"),
    BLUE(5, "Blue"),
    INDIGO(6, "Indigo"),
    VIOLET(7, "Violet");

    @Getter
    private final int value;
    @Getter
    private final String name;

    public static Color findByValue(int value) {
        for (Color color : Color.values()) {
            if (color.getValue() == value) {
                return color;
            }
        }
        String message = String.format("No Color with value: %s.", value);
        throw new RuntimeException(message);
    }

    public static Color findByName(String name) {
        for (Color color : Color.values()) {
            if (color.getName().equalsIgnoreCase(name)) {
                return color;
            }
        }
        String message = String.format("No Color with name: %s.", name);
        throw new RuntimeException(message);
    }
}
