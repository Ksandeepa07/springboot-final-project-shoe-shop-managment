package lk.ijse.gdse.shoe_shop_managment.app.repository;

import lk.ijse.gdse.shoe_shop_managment.app.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface CustomerRepo extends JpaRepository<Customer,String> {

    Customer findTopByOrderByCodeDesc();

    List<Customer> findByNameStartingWith(String name);

    boolean existsByEmail(String email);

//    List<Customer> findByDob(Date today);

    @Query("SELECT c FROM Customer c WHERE FUNCTION('MONTH', c.dob) = :month AND FUNCTION('DAY', c.dob) = :day")
    List<Customer> findByMonthAndDay(@Param("month") int month, @Param("day") int day);
}

