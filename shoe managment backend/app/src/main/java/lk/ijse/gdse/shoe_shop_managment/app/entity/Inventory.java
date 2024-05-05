package lk.ijse.gdse.shoe_shop_managment.app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Inventory {
    @Id
    private String code;
    private String name;

    @Column(columnDefinition = "LONGTEXT")
    private String itemPic;

    private String category;
    private Double salePrice;
    private Double buyPrice;
    private Double profit;
    private Double profitMargin;
    private String status;

    @ManyToOne
    @JoinColumn(name = "sCode")
    private Supplier supplier;

    private String sName;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "inventory")
    private List<ShoeSizes> shoeSizes;


}
