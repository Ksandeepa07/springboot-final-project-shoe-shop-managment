package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefundDTO {
    @NotBlank(message = "cannot be null")
    private String orderId;
    @NotBlank(message = "cannot be null")
    private String itemId;
    @NotBlank(message = "cannot be null")
    private String size;
    @NotBlank(message = "cannot be null")
    @Min(value = 1, message = "must be at least 1")
    private Integer qty;
    @NotBlank(message = "cannot be null")
    @Min(value = 1, message = "must be at least 1")
    private Integer price;

}
