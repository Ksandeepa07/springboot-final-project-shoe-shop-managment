package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lk.ijse.gdse.shoe_shop_managment.app.entity.ShoeSizes;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDTO{
    private String code;
    private String name;
    private String itemPic;
    private String category;
    private Double salePrice;
    private Double buyPrice;
    private Double profit;
    private Double profitMargin;
//    private String status;
    private String  sCode;
    private String sName;
    private List<ShoeSizesDTO> shoeSizes;
}
