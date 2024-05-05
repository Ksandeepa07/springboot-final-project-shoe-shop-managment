package lk.ijse.gdse.shoe_shop_managment.app.repository;

import jakarta.persistence.criteria.CriteriaBuilder;
import lk.ijse.gdse.shoe_shop_managment.app.dto.ShoeSizesDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Customer;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Inventory;
import lk.ijse.gdse.shoe_shop_managment.app.entity.ShoeSizes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.SimpleTimeZone;

public interface InventoryRepo extends JpaRepository<Inventory,String> {

    Inventory findTopByCodeStartingWithOrderByCodeDesc(String id);

    List<Inventory> findByNameStartingWith(String name);

    Long countByCategory(String category);


    List<Inventory> findAllByCategoryAndCodeStartingWithAndSalePriceBetween(String category,String type,Double minPrice,Double maxPrice);

    List<Inventory> findAllByCategoryStartingWith(String category);
    List<Inventory> findAllByCodeStartingWith(String type);
    List<Inventory> findAllBySalePriceBetween(Double minPrice,Double maxPrice);

    List<Inventory> findAllByCategoryAndCodeStartingWith(String category,String type);
    List<Inventory> findAllByCategoryAndSalePriceBetween(String category,Double minPrice,Double maxPrice);
    List<Inventory> findAllByCodeStartingWithAndSalePriceBetween(String type,Double minPrice,Double maxPrice);




//    List<Inventory> findAllByCategory
//    Inventory findTopByCodeOrderByCod(String id);

//    @Query(value = "select s.code from Inventory s order by s.code asc ")
//    List<String> getAllSuppliersCodes();


}
