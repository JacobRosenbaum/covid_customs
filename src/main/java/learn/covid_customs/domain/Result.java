package learn.covid_customs.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@EqualsAndHashCode
public class Result<T> {

    @Getter
    ArrayList<String> messages = new ArrayList<>();

    @Getter
    ResultType type = ResultType.SUCCESS;

    @Getter @Setter
    T payload;

    public void addMessage(String message, ResultType type) {
        this.type = type;
        messages.add(message);
    }

    public boolean isSuccess() {
        return type == ResultType.SUCCESS;
    }
}
