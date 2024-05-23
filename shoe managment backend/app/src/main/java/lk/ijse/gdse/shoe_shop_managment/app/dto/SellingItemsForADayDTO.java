package lk.ijse.gdse.shoe_shop_managment.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellingItemsForADayDTO {
    private String item_id;
    private Integer item_qty;
}
