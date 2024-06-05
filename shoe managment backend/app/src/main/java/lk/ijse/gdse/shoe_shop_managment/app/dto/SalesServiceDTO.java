package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Inventory;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Sales;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SalesServiceDTO {
    @NotBlank(message = "cannot be null")
    private String order_Id;
    @NotBlank(message = "cannot be null")
    private String item_id;
    @NotBlank(message = "cannot be null")
    private String name;
    @NotBlank(message = "cannot be null")
    private String size;
    @NotBlank(message = "cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "must be greater than zero")
    private Double unitPrice;
    @NotBlank(message = "cannot be null")
    @Min(value = 1, message = "must be at least 1")
    private Integer itemQty;
}
