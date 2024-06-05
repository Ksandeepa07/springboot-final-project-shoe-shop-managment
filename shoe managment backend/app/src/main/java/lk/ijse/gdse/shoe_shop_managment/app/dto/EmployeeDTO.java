package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse.shoe_shop_managment.app.util.Gender;
import lk.ijse.gdse.shoe_shop_managment.app.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployeeDTO {

    private String code;

    @NotBlank(message = "cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{5,}$", message = "name must contain at least 5 letters ")
    private String name;

    private String proPic;
    private Gender gender;
    @NotBlank(message = "cannot be null")
    private String civilStatus;
    @NotBlank(message = "name cannot be null")
    private String designation;
    private Role role;
    private Date dob;
    private Date joinDate;
    @NotBlank(message = "cannot be null")
    private String branch;
    @NotBlank(message = "cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{5,}$", message = "name must contain at least 5 letters ")
    private String addressLine1;
    @NotBlank(message = " cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{5,}$", message = "name must contain at least 5 letters ")
    private String addressLine2;
    @NotBlank(message = "cannot be null")
    @Pattern(regexp = "^[0-9]{10}$", message = "contact must be a valid 10-digit number")
    private String contact;
    @NotBlank(message = "cannot be null")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",message = "email not in correct format")
    private String email;
    @NotBlank(message = "cannot be null")
    private String guardianName;
    @NotBlank(message = "cannot be null")
    @Pattern(regexp = "^[0-9]{10}$", message = "contact must be a valid 10-digit number")
    private String guardianContact;
}
