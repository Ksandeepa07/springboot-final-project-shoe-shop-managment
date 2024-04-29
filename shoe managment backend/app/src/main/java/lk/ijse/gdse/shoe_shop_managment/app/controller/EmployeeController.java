package lk.ijse.gdse.shoe_shop_managment.app.controller;

import lk.ijse.gdse.shoe_shop_managment.app.dto.CustomerDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.EmployeeDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Employee;
import lk.ijse.gdse.shoe_shop_managment.app.service.EmployeeService;
import lk.ijse.gdse.shoe_shop_managment.app.util.Gender;
import lk.ijse.gdse.shoe_shop_managment.app.util.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("api/v1/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    public EmployeeController() {
        System.out.println("employee working !");
    }

    /*get all employee*/
    @GetMapping("getAllEmployees")
    private List<EmployeeDTO> getAllCustomers(){
        List<EmployeeDTO> employeeDTOs = new ArrayList<>();
        return employeeService.getAllEmployees();

    }

    /*generate next id*/
    @GetMapping("/nextId")
    public String nextId(){
        return employeeService.generateNextId();
    }

    /*save employee*/
    @PostMapping(value = "/save",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public EmployeeDTO save(@RequestParam("code") String code,
                            @RequestParam("name") String name,
                            @RequestParam("email") String email,
                            @RequestParam("proPic") MultipartFile proPic,
                            @RequestParam("contact") String contact,
                            @RequestParam("gender") Gender gender,
                            @RequestParam("designation") String designation,
                            @RequestParam("role") Role role,
                            @RequestParam("civilStatus") String civilStatus,
                            @RequestParam("branch") String branch,
                            @RequestParam("guardianName") String guardianName,
                            @RequestParam("guardianContact") String guardianContact,
                            @RequestParam("addressLine1") String addressLine1,
                            @RequestParam("addressLine2") String addressLine2,
                            @RequestParam("dob") String dob,
                            @RequestParam("joinDate") String joinDate) throws IOException, ParseException {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate = dateFormat.parse(dob);
        Date newJoinDate = dateFormat.parse(joinDate);


        String image = Base64.getEncoder().encodeToString(proPic.getBytes());
        EmployeeDTO employeeDTO = new EmployeeDTO(code,name,image,gender,civilStatus,designation,role,newDate,newJoinDate,branch,
                addressLine1, addressLine2,contact,email,guardianName,guardianContact);

        return employeeService.saveEmployee(employeeDTO);
    }

    /*update employee*/
    @PatchMapping (value = "/update",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public EmployeeDTO update( @RequestParam("code") String code,
                            @RequestParam("name") String name,
                            @RequestParam("email") String email,
                            @RequestParam("proPic") MultipartFile proPic,
                            @RequestParam("contact") String contact,
                            @RequestParam("gender") Gender gender,
                            @RequestParam("designation") String designation,
                            @RequestParam("role") Role role,
                            @RequestParam("civilStatus") String civilStatus,
                            @RequestParam("branch") String branch,
                            @RequestParam("guardianName") String guardianName,
                            @RequestParam("guardianContact") String guardianContact,
                            @RequestParam("addressLine1") String addressLine1,
                            @RequestParam("addressLine2") String addressLine2,
                            @RequestParam("dob") String dob,
                            @RequestParam("joinDate") String joinDate) throws IOException, ParseException {


        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate = dateFormat.parse(dob);
        Date newJoinDate = dateFormat.parse(joinDate);


        String image = Base64.getEncoder().encodeToString(proPic.getBytes());
        EmployeeDTO employeeDTO = new EmployeeDTO(code,name,image,gender,civilStatus,designation,role,newDate,newJoinDate,branch,
                addressLine1, addressLine2,contact,email,guardianName,guardianContact);

        return employeeService.updateEmployee(employeeDTO);
    }

    /*search employee*/
    @GetMapping("/search")
    public List<EmployeeDTO> search(@RequestParam ("name") String name){
       return employeeService.searchEmployee(name);
    }
}




/*save image as file path and get image*/

//    @GetMapping("getAllEmployees")
//    private List<EmployeeDTO> getAllCustomers(){
//        List<EmployeeDTO> employeeDTOs = new ArrayList<>();
//        List<EmployeeDTO> allEmployees = employeeService.getAllEmployees();
//
//
//        for (EmployeeDTO employee : allEmployees) {
//            EmployeeDTO dto = new EmployeeDTO();
//
//            dto.setCode(employee.getCode());
//            dto.setName(employee.getName());
//            dto.setEmail(employee.getEmail());
//            dto.setAddressLine1(employee.getAddressLine1());
//            dto.setAddressLine2(employee.getAddressLine2());
//            dto.setBranch(employee.getBranch());
//            dto.setDob(employee.getDob());
//            dto.setContact(employee.getContact());
//            dto.setGender(employee.getGender());
//            dto.setGuardianName(employee.getGuardianName());
//            dto.setGuardianContact(employee.getGuardianContact());
//            dto.setCivilStatus(employee.getCivilStatus());
//            dto.setDesignation(employee.getDesignation());
//            dto.setJoinDate(employee.getJoinDate());
//            dto.setRole(employee.getRole());
//
//            // Read profile picture
//            try {
//                byte[] imageBytes = Files.readAllBytes(Paths.get(employee.getProPic()));
//                String base64Image = Base64.getEncoder().encodeToString(imageBytes);
//                dto.setProPic(base64Image);
//            } catch (IOException e) {
//                // Handle exception
//            }
//
//            employeeDTOs.add(dto);
//        }
//
//        return employeeDTOs;
//    }


//    @PostMapping(value = "/save",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public EmployeeDTO save(@RequestParam("name") String name,
//                            @RequestParam("email") String email,
//                            @RequestPart("proPic") MultipartFile proPic,
//                            @RequestParam("contact") String contact,
//                            @RequestParam("gender") Gender gender,
//                            @RequestParam("designation") String designation,
//                            @RequestParam("role") Role role,
//                            @RequestParam("civilStatus") String civilStatus,
//                            @RequestParam("branch") String branch,
//                            @RequestParam("guardianName") String guardianName,
//                            @RequestParam("guardianContact") String guardianContact,
//                            @RequestParam("addressLine1") String addressLine1,
//                            @RequestParam("addressLine2") String addressLine2,
//                            @RequestParam("dob") String dob,
//                            @RequestParam("dob") String joinDate) throws IOException, ParseException {
//
//                            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//                            Date newDate = dateFormat.parse(dob);
//                            Date newJoinDate = dateFormat.parse(joinDate);
//
//
//                                    String imageUrl = saveImage(proPic);
//                                    EmployeeDTO employeeDTO = new EmployeeDTO(employeeService.generateNextId(),name,imageUrl,gender,civilStatus,designation,role,newDate,newJoinDate,branch,
//                                            addressLine1, addressLine2,contact,email,guardianName,guardianContact);
//
//                                    return employeeService.saveEmployee(employeeDTO);
//    }

//
//
//    private String saveImage(MultipartFile proPic) throws IOException {
//        String uniqueFileName = UUID.randomUUID().toString() + "_" + proPic.getOriginalFilename();
//        Path uploadPath = Path.of("src/main/resources/static/images/");
//        Path filePath = uploadPath.resolve(uniqueFileName);
//
//        if (!Files.exists(uploadPath)) {
//            Files.createDirectories(uploadPath);
//        }
//
//        Files.copy(proPic.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//        return filePath.toString();
//    }
