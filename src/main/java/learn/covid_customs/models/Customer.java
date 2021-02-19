package learn.covid_customs.models;

import learn.covid_customs.validation.NoDuplicateEmail;
import learn.covid_customs.validation.PasswordStrength;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

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
    @Email(message = "Invalid Email Address")
    @NoDuplicateEmail
    private String email;

    @Getter
    @Setter
    @PasswordStrength
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
