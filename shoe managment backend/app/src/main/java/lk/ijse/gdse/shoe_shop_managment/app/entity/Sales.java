package lk.ijse.gdse.shoe_shop_managment.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
//@ToString
public class Sales {
    @Id
    private String orderId;
    private Timestamp orderDate;
    private String paymentMethod;
    private Double totalPrice;
    private Double addedPoints;
    private String cashierName;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customerId;

    private String customerName;

    @OneToMany(mappedBy = "order_id")
    private List<SalesService> salesServices;

    public Sales(String orderId, Timestamp orderDate, String paymentMethod, Double totalPrice, Double addedPoints, String cashierName) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.paymentMethod = paymentMethod;
        this.totalPrice = totalPrice;
        this.addedPoints = addedPoints;
        this.cashierName = cashierName;
    }

    public Sales(String orderId, Timestamp orderDate, String paymentMethod, Double totalPrice, Double addedPoints, String cashierName, Customer customerId, String customerName) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.paymentMethod = paymentMethod;
        this.totalPrice = totalPrice;
        this.addedPoints = addedPoints;
        this.cashierName = cashierName;
        this.customerId = customerId;
        this.customerName = customerName;
    }
}
