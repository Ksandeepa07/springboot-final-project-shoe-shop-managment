package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lk.ijse.gdse.shoe_shop_managment.app.util.SupplierCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDTO {
    private String code;
    private String name;
    private SupplierCategory category;
    private String email;
    private String contactMobile;
    private String contactLand;
    private String addressLine1;
    private String addressLine2;
}
