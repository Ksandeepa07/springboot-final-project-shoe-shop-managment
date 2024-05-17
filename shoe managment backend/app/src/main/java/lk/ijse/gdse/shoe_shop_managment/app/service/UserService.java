package lk.ijse.gdse.shoe_shop_managment.app.service;


import lk.ijse.gdse.shoe_shop_managment.app.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    UserDetailsService userDetailService();

    void save(UserDTO userDTO);
}
