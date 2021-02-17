package learn.covid_customs.domain;

import learn.covid_customs.models.Color;
import learn.covid_customs.models.Mask;
import learn.covid_customs.models.Material;
import learn.covid_customs.models.Style;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class MaskService {

    private final MaskRepository repository;

    public List<Mask> findAll() {
        return repository.findAll();
    }

    public Mask findById(int maskId) {
        return repository.findById(maskId);
    }

    public List<Mask> findByColor(Color color) {
        return repository.findByColor(color);
    }

    public List<Mask> findByStyle(Style style) {
        return repository.findByStyle(style);
    }

    public List<Mask> findByMaterial(Material material) {
        return repository.findByMaterial(material);
    }

    public Result<Mask> add(Mask mask) {
        Result<Mask> result = validate(mask);
        if (!result.isSuccess()) {
            return result;
        }
        if (mask.getMaskId() > 0) {
            result.addMessage("MaskId cannot be set for adding a mask.", ResultType.INVALID);
            return result;
        }
        result.messages(repository.add(mask));
        return result;
    }

    public Result<Mask> update(Mask mask) {
        Result<Mask> result = validate(mask);
        if (!result.isSuccess()) {
            return result;
        }
        if (mask.getMaskId() <= 0) {
            result.addMessage("MaskId must be set for update a mask.", ResultType.INVALID);
            return result;
        }
        if (!repository.update(mask)) {
            String message = String.format("Mask Id %s not found.", mask.getMaskId());
            result.addMessage(message, ResultType.NOT_FOUND);
            return result;
        }
        result.setPayload(mask);
        return result;
    }
    
    public boolean deleteById(int maskId) {
        return repository.deleteById(maskId);
    }

    public Result<Mask> validate(Mask mask) {
        Result<Mask> result = new Result<>();
        if (mask == null) {
            result.addMessage("Mask cannot null.", ResultType.INVALID);
            return result;
        }
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Mask>> violations = validator.validate(mask);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<Mask> violation : violations) {
                result.addMessage(violation.getMessage(), ResultType.INVALID);
            }
        }
        return result;
    }
}
