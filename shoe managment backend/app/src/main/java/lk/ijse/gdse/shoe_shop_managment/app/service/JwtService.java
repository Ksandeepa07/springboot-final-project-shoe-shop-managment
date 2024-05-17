package lk.ijse.gdse.shoe_shop_managment.app.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String extractUserName(String token);
    String generateToken(UserDetails userDetails);
    boolean isValidToken(String token,UserDetails userDetails);
}
