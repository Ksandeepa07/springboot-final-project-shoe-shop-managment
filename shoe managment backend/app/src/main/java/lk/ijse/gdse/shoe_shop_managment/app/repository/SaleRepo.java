package lk.ijse.gdse.shoe_shop_managment.app.repository;

import lk.ijse.gdse.shoe_shop_managment.app.entity.Customer;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Sales;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleRepo extends JpaRepository<Sales,String > {
    Sales findTopByOrderByOrderIdDesc();
    List<Sales> findByOrderIdStartingWith(String id);
}
