package lk.ijse.gdse.shoe_shop_managment.app.repository;

import lk.ijse.gdse.shoe_shop_managment.app.Embeddable.SalesServicePK;
import lk.ijse.gdse.shoe_shop_managment.app.entity.SalesService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SaleServiceRepo extends JpaRepository<SalesService,SalesServicePK> {

    @Query(value = "SELECT SUM(item_qty) as total,item_id FROM sales_service GROUP BY item_id ORDER BY total DESC LIMIT 3", nativeQuery = true)
    List<TopSellingItem> findTopSellingItems();

//    @Query(value = "SELECT SUM(item_qty) as total, item_id FROM sales_service WHERE date = :date GROUP BY item_id ORDER BY total DESC LIMIT 1 ", nativeQuery = true)
//    TopSellingItem findTopSellingItemForTheDay(@Param("date") String date);

    @Query(value = "SELECT SUM(ss.item_qty) as total, ss.item_id FROM sales_service ss JOIN sales s ON ss.order_id = s.order_id WHERE s.order_date like :date% GROUP BY ss.item_id ORDER BY total DESC LIMIT 1", nativeQuery = true)
    TopSellingItem findTopSellingItemForTheDay(@Param("date") String date);


    @Query(value = "SELECT ss.item_id,ss.item_qty from sales_service ss inner join sales s on ss.order_id=s.order_id where s.order_date like :date%", nativeQuery = true)
    List<SellingItemsForADay> findAllTHeItemsSellingForADay(@Param("date") String date);




}
