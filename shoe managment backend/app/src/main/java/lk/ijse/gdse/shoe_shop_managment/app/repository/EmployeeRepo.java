package lk.ijse.gdse.shoe_shop_managment.app.repository;

import lk.ijse.gdse.shoe_shop_managment.app.entity.Customer;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
    Employee findTopByOrderByCodeDesc();
    List<Employee> findByNameStartingWith(String name);

    boolean existsByEmail(String email);
    Optional<Employee> findByEmail(String email);
}
