package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse.shoe_shop_managment.app.util.SupplierCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDTO {
    private String code;
    @NotBlank(message = "name cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{5,}$", message = "name must contain at least 5 letters")
    private String name;
    @NotBlank(message = "name cannot be null")
    private SupplierCategory category;
    @NotBlank(message = "email cannot be null")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",message = "email not in correct format")
    private String email;

    @NotBlank(message = "contact cannot be null")
    @Pattern(regexp = "^[0-9]{10}$", message = "contact must be a valid 10-digit number")
    private String contactMobile;
    @NotBlank(message = "contact cannot be null")
    @Pattern(regexp = "^[0-9]{10}$", message = "contact must be a valid 10-digit number")
    private String contactLand;

    @NotBlank(message = "name cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{5,}$", message = "name must contain at least 5 letters")
    private String addressLine1;

    @NotBlank(message = "name cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{5,}$", message = "name must contain at least 5 letters")
    private String addressLine2;
}
