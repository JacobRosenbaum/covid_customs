package learn.covid_customs.models;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Customer {

    @Getter
    @Setter
    private int customerId;

    @Getter
    @Setter
    @NotNull
    private String firstName;

    @Getter
    @Setter
    @NotNull
    private String lastName;

    @Getter
    @Setter
    @NotNull
    private String email;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
    @NotNull
    private String address;

    @Getter
    @Setter
    @NotNull
    private String phone;

    @Getter
    @Setter
    @NotNull
    private String role;
}
