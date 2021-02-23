package learn.covid_customs.models;

import learn.covid_customs.validation.NoDuplicateEmail;
import learn.covid_customs.validation.PasswordStrength;
import lombok.*;
import org.springframework.format.annotation.NumberFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
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
    @NotEmpty(message = "First name required")
    @Size(max = 50, message = "firstName must be shorter than 50 characters")
    private String firstName;

    @Getter
    @Setter
    @NotEmpty(message = "Last name required")
    @Size(max = 50, message = "lastName must be shorter than 50 characters")
    private String lastName;

    @Getter
    @Setter
    @NotEmpty(message = "Email required")
    @Email(message = "Invalid Email")
    @Size(max = 50, message = "email must be shorter than 50 characters")
    //@NoDuplicateEmail
    private String email;

    @Getter
    @Setter
    @PasswordStrength
    private String password;

    @Getter
    @Setter
    @NotEmpty(message = "Address required")
    private String addressLine;

    @Getter
    @Setter
    @NotEmpty(message = "City required")
    private String city;

    @Getter
    @Setter
    @NotEmpty(message = "State required")
    @Size(max = 2, message = "Must be a State Abbreviation")
    private String state;

    @Getter
    @Setter
    @NotNull(message = "Zip Code required")
    private int zipCode;


    @Getter
    @Setter
    @NotEmpty(message = "Phone number required")
    private String phone;

    @Getter
    @Setter
    private String role;
}
