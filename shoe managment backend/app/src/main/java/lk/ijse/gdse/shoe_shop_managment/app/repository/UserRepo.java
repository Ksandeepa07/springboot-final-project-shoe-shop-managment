package lk.ijse.gdse.shoe_shop_managment.app.repository;

import lk.ijse.gdse.shoe_shop_managment.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,String > {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
