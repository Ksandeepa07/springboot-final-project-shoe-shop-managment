package lk.ijse.gdse.shoe_shop_managment.app.controller;


import lk.ijse.gdse.shoe_shop_managment.app.request.SignUpRequest;
import lk.ijse.gdse.shoe_shop_managment.app.response.JwtAuthResponse;
import lk.ijse.gdse.shoe_shop_managment.app.service.AuthenticationService;
import lk.ijse.gdse.shoe_shop_managment.app.service.impl.AuthenticationSeviceIpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins ="*")
public class UserController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signing")
    public ResponseEntity<JwtAuthResponse> signIn (@RequestBody SignUpRequest signInRequest){
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthResponse> signUp (@RequestBody SignUpRequest signUpRequest){
        System.out.println(signUpRequest);
        return ResponseEntity.ok(authenticationService.signUP(signUpRequest));
    }

//    @PostMapping("/refreshToken/{token}")
//    public JwtAuthResponse refreshToken(@PathVariable String token){
//        System.out.println("this is token hutto "+token);
//       return authenticationService.findByToken(token);
//
//    }

}
