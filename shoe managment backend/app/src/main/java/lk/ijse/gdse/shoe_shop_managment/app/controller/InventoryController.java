package lk.ijse.gdse.shoe_shop_managment.app.controller;

import jakarta.persistence.Access;
import lk.ijse.gdse.shoe_shop_managment.app.dto.CustomerDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.InventoryDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SearchDTO;
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
        return inventoryService.saveInventory(inventoryDTO);

    }

    @PatchMapping("/update")
    public InventoryDTO update(@RequestBody InventoryDTO inventoryDTO){
        System.out.println(inventoryDTO);
        return inventoryService.updateInventory(inventoryDTO);

    }


    @DeleteMapping("/delete/{id}")
    public boolean delete (@PathVariable String id){
        return inventoryService.deleteInventory(id);
    }

    @GetMapping("/getALl")
    public List<InventoryDTO> getAll(){
        return inventoryService.getAllInventory();
    }

    @GetMapping("/search")
    public List<InventoryDTO> search(@RequestParam("name") String name){
        return inventoryService.searchInventory(name);
    }

    @GetMapping("/countIds")
    public Long countIds(){
        return inventoryService.countIds();
    }

    @GetMapping("/searchByCategoryAndSize/{category}/{type}")
    public List<InventoryDTO> searchByCategoryAndSize(@PathVariable String category, @PathVariable String type){
        System.out.println(category);
        System.out.println(type);

       return inventoryService.searchByCategoryAndSize(new SearchDTO(category,type));

    }

    @GetMapping("/searchByCategory/{category}")
    public List<InventoryDTO> searchByCategory(@PathVariable String category){
        System.out.println(category);

        return inventoryService.searchByCategory(category);

    }


    @GetMapping("/searchByAllConditions/{category}/{type}/{minPrice}/{maxPrice}")
    public List<InventoryDTO> searchByAllConditions(@PathVariable String category, @PathVariable Double maxPrice, @PathVariable Double minPrice, @PathVariable String type){
        System.out.println(category);
        System.out.println(maxPrice);
        System.out.println(minPrice);
        System.out.println(type);

        return inventoryService.searchByAllConditions(category,type,minPrice,maxPrice);

    }


}
