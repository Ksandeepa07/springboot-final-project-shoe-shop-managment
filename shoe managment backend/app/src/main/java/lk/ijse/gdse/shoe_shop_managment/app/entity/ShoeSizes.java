package lk.ijse.gdse.shoe_shop_managment.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeSizes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer code;
    private String size;
    private Integer qty;
    private String status;

    @ManyToOne
    @JoinColumn(name = "iCode")
    private Inventory inventory;
}
