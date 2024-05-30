package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse.shoe_shop_managment.app.util.Gender;
import lk.ijse.gdse.shoe_shop_managment.app.util.CustomerLoyaltyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerDTO {
    private String code;

    @NotBlank(message = "name cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{5,}$", message = "name must contain at least 5 letters or spaces")
    private String name;

    @NotBlank(message = "email cannot be null")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",message = "email not in correct format")
    private String email;

    private Gender gender;

    @NotBlank(message = "contact cannot be null")
    @Pattern(regexp = "^[0-9]{10}$", message = "contact must be a valid 10-digit number")
    private String contact;

    private Date dob;

    @NotBlank(message = "address cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{5,}$", message = "address must contain at least 5 letters or spaces")
    private String addressLine1;

    private String addressLine2;
    private Date loyaltyDate;
    private CustomerLoyaltyLevel loyaltyLevel;
    private Integer loyaltyPoints;
    private Timestamp recentPurchaseDate;
}
