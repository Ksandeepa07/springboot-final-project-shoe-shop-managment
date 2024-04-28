package lk.ijse.gdse.shoe_shop_managment.app.service;

import lk.ijse.gdse.shoe_shop_managment.app.dto.CustomerDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Customer;
import lk.ijse.gdse.shoe_shop_managment.app.repository.CustomerRepo;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.DuplicateRecordException;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper mapper;
    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCode())){
            throw new DuplicateRecordException("Customer Id is already exists !!");
        }
      return mapper.map(customerRepo.save(mapper.map(customerDTO, Customer.class)),CustomerDTO.class);
    }

    @Override
    public CustomerDTO updateCustomer(CustomerDTO customerDTO) {
        if (!customerRepo.existsById(customerDTO.getCode())){
            throw new NotFoundException("Can't find customer id !!");
        }
        return mapper.map(customerRepo.save(mapper.map(customerDTO, Customer.class)), CustomerDTO.class);
    }

    @Override
    public boolean deleteCustomer(String id) {
        if (!customerRepo.existsById(id)){
            throw new NotFoundException("Can't find customer id !!");
        }
        return false;
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
}