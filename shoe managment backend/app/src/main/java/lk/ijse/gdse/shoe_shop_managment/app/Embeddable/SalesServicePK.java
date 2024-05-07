package lk.ijse.gdse.shoe_shop_managment.app.Embeddable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesServicePK implements Serializable {
    private String order_id;
    private String item_id;
    private String size;

}
