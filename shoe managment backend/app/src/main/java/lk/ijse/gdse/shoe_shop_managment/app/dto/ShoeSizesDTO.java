package lk.ijse.gdse.shoe_shop_managment.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeSizesDTO {
    private Integer code;
    private String size;
    private Integer qty;
    private String status;
}
