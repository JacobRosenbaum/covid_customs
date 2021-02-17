package learn.covid_customs.controllers;

import learn.covid_customs.domain.MaskService;
import learn.covid_customs.models.Mask;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = {"localhost:3000"})
@RequestMapping("/api/mask")
public class MaskController {

    private final MaskService maskService;

    public MaskController(MaskService maskService) {
        this.maskService = maskService;
    }

    @GetMapping
    public List<Mask> findAll() {
        return maskService.findAll();
    }

    @GetMapping("/{maskId}")
    public ResponseEntity<Mask> findById(@PathVariable int maskId) {
        Mask mask = maskService.findById(maskId);

        if (mask == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(mask);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody @Valid Mask mask) {
        Result<Mask> result = maskService.add(mask);
        if(result.isSuccess()) {
            rteurn new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{maskId}")
    public ResponseEntity<Mask> update(@PathVariable int maskId, @RequestBody @Valid Mask mask) {
        if (mask.getMaskId() != maskId) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Mask> result = maskService.update(mask);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{maskId}")
    public ResponseEntity<Void> deleteById(@PathVariable int maskId) {
        if (maskService.deleteById(maskId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
