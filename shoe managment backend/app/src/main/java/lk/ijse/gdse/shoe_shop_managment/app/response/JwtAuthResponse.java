package lk.ijse.gdse.shoe_shop_managment.app.response;

import lk.ijse.gdse.shoe_shop_managment.app.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtAuthResponse {
    private String token;
//    private String role;
    private UserDTO userDTO;
    private Date date;
}
