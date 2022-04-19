package learn.covid_customs.controllers;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadSqlGrammarException.class)
    public ResponseEntity<String> handleException(BadSqlGrammarException ex) {
        return new ResponseEntity<>("Bad SQL Grammar Exception",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InvalidFormatException.class)
    public ResponseEntity<String> handleException(InvalidFormatException ex) {
        return new ResponseEntity<>("Invalid Format",
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NumberFormatException.class)
    public ResponseEntity<String> handleException(NumberFormatException ex) {
        return new ResponseEntity<>("Number format not valid",
                HttpStatus.BAD_REQUEST);
    }

 //    @ExceptionHandler(HttpMessageNotReadableException.class)
//    public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
//        return new ResponseEntity<>(List.of("Invalid form input. Please try again."),
//                HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> handleException(MethodArgumentTypeMismatchException ex) {
        return new ResponseEntity<>("Path variable was not entered correctly. Please try again.",
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleException(MethodArgumentNotValidException ex) {
        return new ResponseEntity<>("Path variable not valid. Please try again.",
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception ex) {
        return new ResponseEntity<>("Something went wrong. Please try again later.",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
