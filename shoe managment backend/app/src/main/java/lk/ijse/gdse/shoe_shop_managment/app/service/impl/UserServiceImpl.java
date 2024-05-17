package lk.ijse.gdse.shoe_shop_managment.app.service.impl;

import lk.ijse.gdse.shoe_shop_managment.app.dto.UserDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.User;
import lk.ijse.gdse.shoe_shop_managment.app.repository.UserRepo;
import lk.ijse.gdse.shoe_shop_managment.app.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepo.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("user not found !"));
    }

    @Override
    public void save(UserDTO userDTO) {
        userRepo.save(mapper.map(userDTO, User.class));
    }
}


