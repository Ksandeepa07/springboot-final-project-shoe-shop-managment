package lk.ijse.gdse.shoe_shop_managment.app.controller;

import jakarta.validation.Valid;
import lk.ijse.gdse.shoe_shop_managment.app.dto.CustomerDTO;
import lk.ijse.gdse.shoe_shop_managment.app.response.JwtAuthResponse;
import lk.ijse.gdse.shoe_shop_managment.app.service.AuthenticationService;
import lk.ijse.gdse.shoe_shop_managment.app.service.CustomerService;
import lk.ijse.gdse.shoe_shop_managment.app.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin(origins = "*")

public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticationService authenticationService;

    public CustomerController() {
        System.out.println("customer working !");
    }

    @GetMapping("/getAllCustomers")
    public List<CustomerDTO> getAllCustomers(){
        return customerService.getAllCustomers();
    }

    @PostMapping("/save")
    public CustomerDTO save(@Valid  @RequestBody CustomerDTO customerDTO){
        System.out.println(customerDTO);
        return customerService.saveCustomer(customerDTO);
    }

    @PatchMapping ("/update")
    public CustomerDTO update(@Valid @RequestBody CustomerDTO customerDTO){
        System.out.println(customerDTO);
        return customerService.updateCustomer(customerDTO);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete (@PathVariable String id){
       return customerService.deleteCustomer(id);
    }

    @GetMapping("/nextId")
    public String nextId(){
      return customerService.generateNextId();
    }

    @GetMapping("/search")
    public List<CustomerDTO> search(@RequestParam("name") String name){
       return customerService.searchCustomer(name);
    }

    @GetMapping("/findByCode/{code}")
    public CustomerDTO findById(@PathVariable String code){
        return customerService.findById(code);
    }

    @GetMapping("/sendEmail")
    public boolean sendEmail(){
        System.out.println("www");
        return emailService.sendBirthdayEmails();
    }


}
