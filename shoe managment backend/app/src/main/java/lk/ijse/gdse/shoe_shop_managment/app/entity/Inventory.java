package lk.ijse.gdse.shoe_shop_managment.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Inventory {
    @Id
    private String code;
    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String itemPic;

    private String category;
    private Integer size;
    private Double salePrice;
    private Double buyPrice;
    private Double profit;
    private Double profitMargin;
    private String status;
    private Integer qty;

    @ManyToOne
    @JoinColumn(name = "sCode")
    private Supplier supplier;

    private String sName;


}
