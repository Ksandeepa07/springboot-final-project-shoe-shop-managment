package lk.ijse.gdse.shoe_shop_managment.app.entity;

import jakarta.persistence.*;
import lk.ijse.gdse.shoe_shop_managment.app.util.SupplierCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {
    @Id
    private String code;
    private String name;

    @Enumerated(EnumType.STRING)
    private SupplierCategory category;

    @Column(unique = true)
    private String email;
    private String contactMobile;
    private String contactLand;
    private String addressLine1;
    private String addressLine2;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "supplier")
    private List<Inventory> inventory;


}
