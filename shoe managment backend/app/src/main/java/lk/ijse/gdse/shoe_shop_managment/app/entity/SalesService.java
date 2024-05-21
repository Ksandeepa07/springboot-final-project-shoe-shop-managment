package lk.ijse.gdse.shoe_shop_managment.app.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lk.ijse.gdse.shoe_shop_managment.app.Embeddable.SalesServicePK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesService {

    @EmbeddedId
    private SalesServicePK salesServicePK;

    @ManyToOne
    @JoinColumn(name = "order_id",insertable = false,updatable = false)
    private Sales order_id;

    @ManyToOne
    @JoinColumn(name = "item_id",insertable = false,updatable = false)
    private Inventory item_id;


    private String name;
//    private String size;
    private Double unitPrice;
    private Integer itemQty;


}
