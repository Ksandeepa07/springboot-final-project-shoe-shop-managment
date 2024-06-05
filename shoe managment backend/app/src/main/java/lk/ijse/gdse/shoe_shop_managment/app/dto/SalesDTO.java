package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jdk.dynalink.linker.LinkerServices;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SalesDTO {
    @NotBlank(message = "cannot be null")
    private String orderId;
    private Timestamp orderDate;
    @NotBlank(message = "cannot be null")
    private String paymentMethod;
    @NotBlank(message = "cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "must be greater than zero")
    private Double totalPrice;
    @NotBlank(message = "cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "must be greater than zero")
    private Double addedPoints;
    @NotBlank(message = "cannot be null")
    private String cashierName;
    @NotBlank(message = "cannot be null")
    private String customerId;
    @NotBlank(message = "cannot be null")
    private String customerName;
    private List<SalesServiceDTO> salesServices;

}
