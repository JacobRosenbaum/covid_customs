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
    @NotNull(message = "First name required")
    private String firstName;

    @Getter
    @Setter
    @NotNull(message = "Last name required")
    private String lastName;

    @Getter
    @Setter
    @NotNull(message = "Email required")
    @Email(message = "Invalid Email")
    //@NoDuplicateEmail
    private String email;

    @Getter
    @Setter
    @PasswordStrength
    private String password;

    @Getter
    @Setter
    @NotNull(message = "Address required")
    private String address;

    @Getter
    @Setter
    @NotNull(message = "Phone number required")
    private String phone;

    @Getter
    @Setter
    private String role;
}
