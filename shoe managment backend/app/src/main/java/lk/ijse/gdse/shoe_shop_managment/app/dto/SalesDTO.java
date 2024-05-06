package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jdk.dynalink.linker.LinkerServices;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SalesDTO {
    private String orderId;
    private Timestamp orderDate;
    private String paymentMethod;
    private Double totalPrice;
    private Double addedPoints;
    private String cashierName;
    private String customerId;
    private String customerName;
    private List<SalesServiceDTO> salesServices;

}
