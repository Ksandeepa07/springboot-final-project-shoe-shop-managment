package lk.ijse.gdse.shoe_shop_managment.app.dto;

import lk.ijse.gdse.shoe_shop_managment.app.entity.ShoeSizes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchDTO {
    private String category;
    private String type;

}
