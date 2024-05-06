package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Inventory;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Sales;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SalesServiceDTO {

    private String order_Id;
    private String item_id;
    private String name;
    private String size;
    private Double unitPrice;
    private Integer itemQty;
}
