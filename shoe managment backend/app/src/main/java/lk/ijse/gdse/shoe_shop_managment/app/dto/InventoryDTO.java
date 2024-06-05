package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse.shoe_shop_managment.app.entity.ShoeSizes;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDTO{
    private String code;
    @NotBlank(message = "cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{5,}$", message = "name must contain at least 5 letters ")
    private String name;
    @NotBlank(message = "cannot be null")
    private String itemPic;
    @NotBlank(message = "cannot be null")
    private String category;

    @NotBlank(message = "cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "must be greater than zero")
    private Double salePrice;
    @NotBlank(message = "cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "must be greater than zero")
    private Double buyPrice;
    @NotBlank(message = "cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "must be greater than zero")
    private Double profit;
    @NotBlank(message = "cannot be null")
    private Double profitMargin;
//    private String status;

    @NotBlank(message = "cannot be null")
    private String  sCode;
    @NotBlank(message = "cannot be null")
    private String sName;
    private List<ShoeSizesDTO> shoeSizes;
}
