package learn.covid_customs.validation;

import learn.covid_customs.data.CustomerRepository;
import learn.covid_customs.models.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class DuplicateEmailValidator implements ConstraintValidator<NoDuplicateEmail, String> {

    @Autowired
    CustomerRepository repository;

    @Override
    public void initialize(NoDuplicateEmail constraintAnnotation) {
        // nothing special
    }

    @Override
    public boolean isValid(String string, ConstraintValidatorContext constraintValidatorContext) {
        if (string == null) {
            return true;
        }
        Customer existingCustomer = null;
        try {
            existingCustomer = repository.findByEmail(string);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }

        return (existingCustomer == null || existingCustomer.getCustomerId() == existingCustomer.getCustomerId());
    }
}