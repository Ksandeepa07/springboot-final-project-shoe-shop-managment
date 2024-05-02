package lk.ijse.gdse.shoe_shop_managment.app.controller;

import lk.ijse.gdse.shoe_shop_managment.app.dto.SupplierDTO;
import lk.ijse.gdse.shoe_shop_managment.app.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier")
@CrossOrigin(origins = "*")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    public SupplierController() {
        System.out.println("supplier working");
    }

    @GetMapping("/getAll")
    public List<SupplierDTO> getAll(){
        return supplierService.getAllSuppliers();

    }

    @GetMapping("/nextId")
    public String generateNextId(){
        return supplierService.generateNextId();

    }

    @PostMapping("/save")
    public SupplierDTO save(@RequestBody SupplierDTO supplierDTO){
       return supplierService.saveSupplier(supplierDTO);

    }

    @PatchMapping("/update")
    public SupplierDTO update(@RequestBody SupplierDTO supplierDTO){
        return supplierService.updateSupplier(supplierDTO);

    }

    @DeleteMapping("/delete/{id}")
    public boolean delete (@PathVariable String id){
        return supplierService.deleteSupplier(id);
    }

    @GetMapping("/search")
    public List<SupplierDTO> search(@RequestParam("name") String name){
        return supplierService.searchSupplier(name);

    }




}
