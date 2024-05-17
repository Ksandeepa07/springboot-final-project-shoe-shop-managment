package lk.ijse.gdse.shoe_shop_managment.app.service.impl;

import lk.ijse.gdse.shoe_shop_managment.app.dto.CustomerDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Customer;
import lk.ijse.gdse.shoe_shop_managment.app.repository.CustomerRepo;
import lk.ijse.gdse.shoe_shop_managment.app.service.CustomerService;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.DuplicateRecordException;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper mapper;
    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCode())){
            throw new DuplicateRecordException("id");
        }if (customerRepo.existsByEmail(customerDTO.getEmail())){
            throw new DuplicateRecordException("email");
        }
      return mapper.map(customerRepo.save(mapper.map(customerDTO, Customer.class)),CustomerDTO.class);
    }

    @Override
    public CustomerDTO updateCustomer(CustomerDTO customerDTO) {
        if (!customerRepo.existsById(customerDTO.getCode())){
            throw new NotFoundException("Can't find customer id !!");
        }

        Customer customer = customerRepo.findById(customerDTO.getCode()).get();
        System.out.println("customer is "+customer);

       if (!customer.getEmail().equals(customerDTO.getEmail())){
            if (customerRepo.existsByEmail(customerDTO.getEmail())){
                throw new DuplicateRecordException("email");
            }
        }



        customerDTO.setLoyaltyLevel(customer.getLoyaltyLevel());
        customerDTO.setLoyaltyPoints(customer.getLoyaltyPoints());
        customerDTO.setRecentPurchaseDate(customer.getRecentPurchaseDate());

        return mapper.map(customerRepo.save(mapper.map(customerDTO, Customer.class)), CustomerDTO.class);
    }

    @Override
    public boolean deleteCustomer(String id) {
        if (!customerRepo.existsById(id)){
            throw new NotFoundException("Can't find customer id !!");
        }

        try{
            customerRepo.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }


    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerRepo.findAll().stream().map(customer -> mapper.map(customer, CustomerDTO.class)).toList();
    }

    @Override
    public List<CustomerDTO> searchCustomer(String name) {

       return customerRepo.findByNameStartingWith(name).stream().map(customer -> mapper.map(customer, CustomerDTO.class)).toList();
    }

    @Override
    public String generateNextId() {
        String prefix = "C";
        String id = "";

        Customer lastCustomer = customerRepo.findTopByOrderByCodeDesc();
        int nextNumericPart;
        if (lastCustomer != null) {
            String lastCode = lastCustomer.getCode();
            String numericPartString = lastCode.substring(prefix.length());
            try {
                int numericPart = Integer.parseInt(numericPartString);
                nextNumericPart = numericPart + 1;
            } catch (NumberFormatException e) {
                nextNumericPart = 1;
            }
        } else {
            nextNumericPart = 1;
        }
        id = prefix + String.format("%03d", nextNumericPart);

        return id;

    }

    @Override
    public CustomerDTO findById(String code) {
        return mapper.map(customerRepo.findById(code),CustomerDTO.class);
    }
}
