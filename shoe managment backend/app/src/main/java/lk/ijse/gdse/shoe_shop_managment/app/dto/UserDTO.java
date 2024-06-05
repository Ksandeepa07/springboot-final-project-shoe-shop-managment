package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse.shoe_shop_managment.app.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    @NotBlank(message = "cannot be null")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",message = "email not in correct format")
    private String email;
    @NotBlank(message = "cannot be null")
    private String password;
    private Role userRole;
}
