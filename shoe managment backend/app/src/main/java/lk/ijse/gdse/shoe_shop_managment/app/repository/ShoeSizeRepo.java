package lk.ijse.gdse.shoe_shop_managment.app.repository;

import jakarta.persistence.criteria.CriteriaBuilder;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Inventory;
import lk.ijse.gdse.shoe_shop_managment.app.entity.ShoeSizes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface ShoeSizeRepo extends JpaRepository<ShoeSizes,Integer> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM shoe_sizes WHERE i_code= :itemCode", nativeQuery = true)
    void deleteByItemCode(String itemCode);
}

