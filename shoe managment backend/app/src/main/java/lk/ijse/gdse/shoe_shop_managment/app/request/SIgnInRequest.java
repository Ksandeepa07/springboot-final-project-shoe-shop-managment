package lk.ijse.gdse.shoe_shop_managment.app.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SIgnInRequest {
    private String email;
    private String password;
}
