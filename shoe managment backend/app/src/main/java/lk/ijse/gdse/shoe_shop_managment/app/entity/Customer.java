package lk.ijse.gdse.shoe_shop_managment.app.entity;

import jakarta.persistence.*;
import lk.ijse.gdse.shoe_shop_managment.app.util.Gender;
import lk.ijse.gdse.shoe_shop_managment.app.util.CustomerLoyaltyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
//@GeneratedValue(strategy = GenerationType.AUTO)
    private String code;
    private String name;

    @Column(unique = true)
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String contact;
    private Date dob;
    private String addressLine1;
    private String addressLine2;
    private Date loyaltyDate;

    @Enumerated(EnumType.STRING)
    private CustomerLoyaltyLevel loyaltyLevel;

    private Integer loyaltyPoints;
    private Timestamp recentPurchaseDate;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "customerId")
    private List<Sales> sales;


}
