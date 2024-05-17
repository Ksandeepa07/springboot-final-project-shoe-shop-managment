package lk.ijse.gdse.shoe_shop_managment.app.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.gdse.shoe_shop_managment.app.service.JwtService;
import lk.ijse.gdse.shoe_shop_managment.app.service.UserService;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.ServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
public class JwtConfigurationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserService userService;
//    private static final Logger logger = LoggerFactory.getLogger(JwtConfigurationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if(authorization!=null && authorization.startsWith("Bearer ")) {
            String jwt = authorization.substring(7);

            System.out.println("jwt "+jwt);

            String username = jwtService.extractUserName(jwt);

            if (username !=null && SecurityContextHolder.getContext().getAuthentication()==null ){
                UserDetails userDetails =userService.userDetailService().loadUserByUsername(username);
                System.out.println("user details "+userDetails);

                if(jwtService.isValidToken(jwt,userDetails)){
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }

        }

        filterChain.doFilter(request,response);
    }

}
