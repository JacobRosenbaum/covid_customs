package learn.covid_customs.domain;

import learn.covid_customs.data.OrderRepository;
import learn.covid_customs.models.Order;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class OrderService {
    private final OrderRepository repository;

    public List<Order> findAll(){
        return repository.findAll();
    }

    public List<Order> findByCustomerId( int customerId){
        return repository.findByCustomerId(customerId);
    }

    public Order findById(int orderId){
        return repository.findById(orderId);
    }

    public Result<Order> add(Order order){
        Result<Order> result= validate(order);
        if (!result.isSuccess()) {
            return result;
        }
        if (order.getOrderId() > 0) {
            result.addMessage("OrderId cannot be set for adding a order.", ResultType.INVALID);
            return result;
        }
        result.setPayload(repository.add(order));
        return result;
    }

    public Result<Order> update(Order order){
        Result<Order> result= validate(order);
        if (!result.isSuccess()) {
            return result;
        }
        if (order.getOrderId() <= 0) {
            result.addMessage("OrderId must be set for update a order.", ResultType.INVALID);
            return result;
        }
        if (!repository.update(order)) {
            String message = String.format("Mask Id %s not found.", order.getOrderId());
            result.addMessage(message, ResultType.NOT_FOUND);
            return result;
        }
        result.setPayload(order);
        return result;
    }

    public boolean deleteById(int orderId){
        return repository.deleteById(orderId);
    }

    public Result<Order> validate(Order order){
        Result<Order> result= new Result<>();
        if (order == null) {
            result.addMessage("Order cannot null.", ResultType.INVALID);
            return result;
        }
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Order>> violations = validator.validate(order);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<Order> violation : violations) {
                result.addMessage(violation.getMessage(), ResultType.INVALID);
            }
        }
//        if (order.getPurchaseDate()!=null && order.getPurchaseDate().isAfter(LocalDate.now())) {
//            result.addMessage("Purchase date must be in the past.", ResultType.INVALID);
//        }
        //Not for sure if I need to account for this
        order.setPurchased(order.getPurchaseDate()!=null);

        return result;
    }


    //May not need below
//    private BigDecimal calculateTotal(Order order){
//
//    }

}
