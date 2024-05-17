package lk.ijse.gdse.shoe_shop_managment.app.service;


import lk.ijse.gdse.shoe_shop_managment.app.request.SignUpRequest;
import lk.ijse.gdse.shoe_shop_managment.app.response.JwtAuthResponse;

public interface AuthenticationService {
    JwtAuthResponse signIn(SignUpRequest sIgnInRequest);
    JwtAuthResponse signUP(SignUpRequest signUpRequest);

    JwtAuthResponse findByToken(String token);
}
