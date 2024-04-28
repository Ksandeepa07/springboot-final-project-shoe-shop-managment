package lk.ijse.gdse.shoe_shop_managment.app.service;

import lk.ijse.gdse.shoe_shop_managment.app.dto.CustomerDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.EmployeeDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Customer;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Employee;
import lk.ijse.gdse.shoe_shop_managment.app.repository.EmployeeRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.event.MouseAdapter;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ModelMapper mapper;
    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) {
        return mapper.map(employeeRepo.save(mapper.map(employeeDTO, Employee.class)),EmployeeDTO.class);
    }

    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO) {
        return mapper.map(employeeRepo.save(mapper.map(employeeDTO, Employee.class)),EmployeeDTO.class);
    }

    @Override
    public boolean deleteEmployee(String id) {
        return false;
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepo.findAll().stream().map(employee -> mapper.map(employee, EmployeeDTO.class)).toList();
    }

    @Override
    public EmployeeDTO searchEmployee(String id) {
        return null;
    }

    @Override
    public String generateNextId() {
        String prefix = "E";
        String id = "";

        Employee lastEmployee = employeeRepo.findTopByOrderByCodeDesc();
        int nextNumericPart;
        if (lastEmployee != null) {
            String lastCode = lastEmployee.getCode();
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
