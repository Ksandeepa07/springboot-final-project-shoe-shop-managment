package lk.ijse.gdse.shoe_shop_managment.app.repository;

import lk.ijse.gdse.shoe_shop_managment.app.Embeddable.SalesServicePK;
import lk.ijse.gdse.shoe_shop_managment.app.entity.SalesService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleServiceRepo extends JpaRepository<SalesService,SalesServicePK> {
}
