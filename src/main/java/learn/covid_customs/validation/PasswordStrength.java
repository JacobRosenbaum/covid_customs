package learn.covid_customs.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({FIELD, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = {PasswordValidator.class})
@Documented
public @interface PasswordStrength {
    String message() default "password must be 8 characters long and contain a digit, a letter, and a non-digit/non-letter";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}