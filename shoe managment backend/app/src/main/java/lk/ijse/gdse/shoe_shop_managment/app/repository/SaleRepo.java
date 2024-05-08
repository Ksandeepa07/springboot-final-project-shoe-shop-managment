package lk.ijse.gdse.shoe_shop_managment.app.repository;

import lk.ijse.gdse.shoe_shop_managment.app.entity.Sales;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepo extends JpaRepository<Sales,String > {
    Sales findTopByOrderByOrderIdDesc();
}
