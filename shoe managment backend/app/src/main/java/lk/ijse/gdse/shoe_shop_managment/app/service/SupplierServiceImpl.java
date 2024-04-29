package lk.ijse.gdse.shoe_shop_managment.app.service;

import lk.ijse.gdse.shoe_shop_managment.app.dto.SupplierDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Employee;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Supplier;
import lk.ijse.gdse.shoe_shop_managment.app.repository.SupplierRepo;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.DuplicateRecordException;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService{
    @Autowired
    private SupplierRepo supplierRepo;

    @Autowired
    private ModelMapper mapper;
    @Override
    public SupplierDTO saveSupplier(SupplierDTO supplierDTO) {
        if(supplierRepo.existsById(supplierDTO.getCode())){
            throw new DuplicateRecordException("Supplier id is already exist !!");
        }
          return mapper.map(supplierRepo.save(mapper.map(supplierDTO, Supplier.class)),SupplierDTO.class);
    }

    @Override
    public SupplierDTO updateSupplier(SupplierDTO supplierDTO) {
        if(!supplierRepo.existsById(supplierDTO.getCode())){
            throw new NotFoundException("Supplier id is not found !!");
        }
        return mapper.map(supplierRepo.save(mapper.map(supplierDTO, Supplier.class)),SupplierDTO.class);
    }

    @Override
    public boolean deleteSupplier(String id) {
        return false;
    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return supplierRepo.findAll().stream().map(supplier -> mapper.map(supplier,SupplierDTO.class)).toList();
    }

    @Override
    public List<SupplierDTO> searchSupplier(String name) {
      return  supplierRepo.findByNameStartingWith(name).stream().map(supplier -> mapper.map(supplier,SupplierDTO.class)).toList();
    }

    @Override
    public String generateNextId() {
        String prefix = "S";
        String id = "";

        Supplier lastsupplier = supplierRepo.findTopByOrderByCodeDesc();
        int nextNumericPart;
        if (lastsupplier != null) {
            String lastCode = lastsupplier.getCode();
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

