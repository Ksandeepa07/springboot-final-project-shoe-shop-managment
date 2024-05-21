package lk.ijse.gdse.shoe_shop_managment.app.service.impl;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lk.ijse.gdse.shoe_shop_managment.app.dto.EmployeeDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.UserDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Employee;
import lk.ijse.gdse.shoe_shop_managment.app.entity.User;
import lk.ijse.gdse.shoe_shop_managment.app.repository.EmployeeRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.UserRepo;
import lk.ijse.gdse.shoe_shop_managment.app.request.SignUpRequest;
import lk.ijse.gdse.shoe_shop_managment.app.response.JwtAuthResponse;
import lk.ijse.gdse.shoe_shop_managment.app.service.AuthenticationService;
import lk.ijse.gdse.shoe_shop_managment.app.service.EmployeeService;
import lk.ijse.gdse.shoe_shop_managment.app.service.JwtService;
import lk.ijse.gdse.shoe_shop_managment.app.service.UserService;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.NotFoundException;
import lk.ijse.gdse.shoe_shop_managment.app.util.Role;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationSeviceIpl implements AuthenticationService {

    @Autowired
    private final PasswordEncoder passwordEncoder;

    private final ModelMapper mapper;

    @Autowired
    private JwtService jwtService;

    private final UserRepo userRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeRepo employeeRepo;

    private final AuthenticationManager authenticationManager;


    @Override
    public JwtAuthResponse signIn(SignUpRequest sIgnInRequest) {

        if (!userRepo.existsByEmail(sIgnInRequest.getEmail())){
            throw new NotFoundException("username");
        }

        try {
            authenticationManager.authenticate((new UsernamePasswordAuthenticationToken(sIgnInRequest.getEmail(), sIgnInRequest.getPassword())));
            User user = userRepo.findByEmail(sIgnInRequest.getEmail()).get();
            Employee employee = employeeRepo.findByEmail(sIgnInRequest.getEmail()).get();


            String generatedToken = jwtService.generateToken(user);
//            UserDTO userDTtO=new UserDTO(user.getEmail(),user.getPassword(),user.getRole());
            Date currentDate=new Date();
            return JwtAuthResponse.builder()
                    .token(generatedToken)
                    .userDTO(mapper.map(user,UserDTO.class))
//                    .role(user.getRole().toString())
                    .date(new Date( currentDate.getTime() +1000*1800))
                    .employeeDTO(mapper.map(employee,EmployeeDTO.class))
                    .build();

        }catch (Exception e){
            throw new NotFoundException("password");
        }


    }

    @Override
    public JwtAuthResponse signUP(SignUpRequest signUpRequest) {
        System.out.println(signUpRequest);

        UserDTO userDTO = UserDTO.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .userRole(Role.fromString(signUpRequest.getRole()))
                .build();

        User user = userRepo.save(mapper.map(userDTO, User.class));
        String token = jwtService.generateToken(user);
        return JwtAuthResponse.builder().token(token).build();

    }

    @Override
    public JwtAuthResponse findByToken(String token) {

        String username = jwtService.extractUserName(token);
        UserDetails userDetails =userService.userDetailService().loadUserByUsername(username);
        System.out.println("user details "+userDetails);

        try {
//            authenticationManager.authenticate((new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword())));
            User user = userRepo.findByEmail(userDetails.getUsername()).get();

            String generatedToken = jwtService.generateToken(user);
            UserDTO userDTtO=new UserDTO(user.getEmail(),user.getPassword(),user.getUserRole());
            Date currentDate=new Date();
            return JwtAuthResponse.builder()
                    .token(generatedToken)
                    .userDTO(userDTtO)
                    .date(new Date( currentDate.getTime() +1000*600))
                    .build();

        }catch (Exception e){
            throw new NotFoundException("password");

        }


    }


}
