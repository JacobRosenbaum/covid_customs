package learn.covid_customs.models;

import lombok.*;


public enum Material {
    POLY_COT(1, "50% polyester and 50% cotton"),
    POLYESTER(2, "Polyester"),
    COTTON(3, "Cotton");

    @Getter
    private final int value;
    @Getter
    private final String name;

    Material(int value, String name) {
        this.value = value;
        this.name = name;
    }

    public static Material findByValue(int value) {
        for (Material material : Material.values()) {
            if (material.getValue() == value) {
                return material;
            }
        }
        String message = String.format("No Material with value: %s.", value);
        throw new RuntimeException(message);
    }

    public static Material findByName(String name) {
        for (Material material : Material.values()) {
            if (material.getName().equalsIgnoreCase(name)) {
                return material;
            }
        }
        String message = String.format("No Material with name: %s.", name);
        throw new RuntimeException(message);
    }
}
