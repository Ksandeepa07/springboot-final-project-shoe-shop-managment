package lk.ijse.gdse.shoe_shop_managment.app.repository;

import lk.ijse.gdse.shoe_shop_managment.app.entity.Customer;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Employee;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplierRepo extends JpaRepository<Supplier,String> {

    Supplier findTopByOrderByCodeDesc();
    List<Supplier> findByNameStartingWith(String name);
    boolean existsByEmail(String email);


    @Query(value = "select s.code from Supplier s order by s.code asc ")
    List<String> getAllSuppliersCodes();



}
