package learn.covid_customs.models;

import lombok.*;

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
    private String firstName;

    @Getter
    @Setter
    private String lastName;

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
    private String address;

    @Getter
    @Setter
    private String phone;
}
