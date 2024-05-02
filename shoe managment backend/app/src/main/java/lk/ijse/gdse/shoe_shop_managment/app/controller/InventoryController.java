package lk.ijse.gdse.shoe_shop_managment.app.controller;

import jakarta.persistence.Access;
import lk.ijse.gdse.shoe_shop_managment.app.dto.InventoryDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SupplierDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Inventory;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Supplier;
import lk.ijse.gdse.shoe_shop_managment.app.service.InventoryService;
import lk.ijse.gdse.shoe_shop_managment.app.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;
    @Autowired
    private SupplierService supplierService;

    public InventoryController() {
        System.out.println("Inventory working");
    }

    @GetMapping("/nextId/{variety}")
    public String nextId(@PathVariable String variety){
       return inventoryService.generateNextId(variety);

    }

    @GetMapping("/loadSupplierCode")
    public List<SupplierDTO> loadSupplierCode(){
     return inventoryService.loadSupplierCode();
    }

    @PostMapping("/save")
    public InventoryDTO save(@RequestBody InventoryDTO inventoryDTO){
        System.out.println(inventoryDTO);
        System.out.println(inventoryDTO.getCode());

        return inventoryService.saveInventory(inventoryDTO);

    }

    @GetMapping("/getALl")
    public List<InventoryDTO> getAll(){
        return inventoryService.getAllInventory();
    }


}
