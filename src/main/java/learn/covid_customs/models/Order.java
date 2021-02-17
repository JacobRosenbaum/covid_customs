//package learn.covid_customs.models;
//
//import lombok.*;
//
//import javax.validation.constraints.NegativeOrZero;
//import javax.validation.constraints.NotEmpty;
//import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Positive;
//import java.time.LocalDate;
//import java.util.List;
//
//@EqualsAndHashCode
//@ToString
//@NoArgsConstructor
//@AllArgsConstructor
//public class Order {
//
//    @Getter
//    @Setter
//    @Positive   //includes zero? make test
//    private int orderId;
//
//    @Getter
//    @Setter
//    @NotNull
//    private Customer customer;
//
//    @Getter
//    @Setter
//    @NotNull
//    @NotEmpty
//    private List<Mask> masks;
//
//    @Getter
//    @Setter
//    private boolean purchased;
//
//    @Getter
//    @Setter
//    private LocalDate purchaseDate;
//
//
//
//}
