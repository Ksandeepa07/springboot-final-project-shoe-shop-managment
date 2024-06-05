package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeSizesDTO {
    private Integer code;
    @NotBlank(message = "cannot be null")
    private String size;
    @NotBlank(message = "cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Sale price must be greater than zero")
    private Integer qty;
    @NotBlank(message = "cannot be null")
    private String status;
}
