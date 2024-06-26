package lk.ijse.gdse.shoe_shop_managment.app.entity;

import jakarta.persistence.*;
import lk.ijse.gdse.shoe_shop_managment.app.util.Gender;
import lk.ijse.gdse.shoe_shop_managment.app.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    private String code;
    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String proPic;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String civilStatus;
    private String designation;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Temporal(TemporalType.DATE)
    private Date dob;

    @Temporal(TemporalType.DATE)
    private Date joinDate;

    private String branch;
    private String addressLine1;
    private String addressLine2;
    private String contact;
    @Column(unique = true)
    private String email;
    private String guardianName;
    private String guardianContact;


}
