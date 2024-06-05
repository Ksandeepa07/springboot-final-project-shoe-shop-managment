package lk.ijse.gdse.shoe_shop_managment.app.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lk.ijse.gdse.shoe_shop_managment.app.service.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
    @Value("${token.key}")
    private String jwtKey;

    @Override
    public String extractUserName(String token) {
        return extractClaims(token,claims -> claims.getSubject());
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        System.out.println("user details "+ userDetails);
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("role",userDetails.getAuthorities());

        System.out.println("user details claims "+ claims);
        System.out.println("user details username "+ userDetails.getUsername());

        Date currentDate=new Date();
        Date expireDate = new Date( currentDate.getTime() +1000*3600);

        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(getSIgnKey(), SignatureAlgorithm.HS256)
                .compact();

        return accessToken;
    }



    @Override
    public boolean isValidToken(String token, UserDetails userDetails) {
        String isValid = extractClaims(token, claims -> claims.getSubject());
        return isValid.equals(userDetails.getUsername() ) && !isExpired(token);
    }


    private Key getSIgnKey(){
        byte[] decode = Decoders.BASE64.decode(jwtKey);
        SecretKey secretKey = Keys.hmacShaKeyFor(decode);
        return secretKey;
    }

    private Claims getAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSIgnKey()).build().parseClaimsJws(token).getBody();

    }

    private <T> T extractClaims(String token, Function<Claims,T> claimResolve){
        Claims allClaims = getAllClaims(token);
        return claimResolve.apply(allClaims);

    }

    public boolean isExpired(String token){
        Date expireDate = extractClaims(token, claims -> claims.getExpiration());
        return expireDate.before(new Date());
    }

}
