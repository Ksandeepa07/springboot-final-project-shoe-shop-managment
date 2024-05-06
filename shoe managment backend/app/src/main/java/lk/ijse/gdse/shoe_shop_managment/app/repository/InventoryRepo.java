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

    Long countByCategoryEndingWith(String category);


    List<Inventory> findAllByCategoryEndingWithAndCodeStartingWithAndSalePriceBetween(String category,String type,Double minPrice,Double maxPrice);

    List<Inventory> findAllByCategoryEndingWith(String category);
    List<Inventory> findAllByCodeStartingWith(String type);
    List<Inventory> findAllBySalePriceBetween(Double minPrice,Double maxPrice);

    List<Inventory> findAllByCategoryEndingWithAndCodeStartingWith(String category,String type);
    List<Inventory> findAllByCategoryEndingWithAndSalePriceBetween(String category,Double minPrice,Double maxPrice);
    List<Inventory> findAllByCodeStartingWithAndSalePriceBetween(String type,Double minPrice,Double maxPrice);




//    List<Inventory> findAllByCategory
//    Inventory findTopByCodeOrderByCod(String id);

//    @Query(value = "select s.code from Inventory s order by s.code asc ")
//    List<String> getAllSuppliersCodes();


}
