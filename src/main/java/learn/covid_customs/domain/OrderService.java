package learn.covid_customs.domain;

import learn.covid_customs.data.OrderRepository;
import learn.covid_customs.models.Order;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

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
        return result;
    }

    public Result<Order> update(Order order){
        Result<Order> result= validate(order);
        return result;
    }

    public boolean deleteById(int orderId){
        return repository.deleteById(orderId);
    }

    public Result<Order> validate(Order order){
        Result<Order> result= new Result<>();
        return result;
    }

    //May not need below
//    private BigDecimal calculateTotal(Order order){
//
//    }

}
