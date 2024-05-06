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

    @GetMapping("/countByCategories/{category}")
    public Long countMensIds(@PathVariable String category){
        return inventoryService.countByCategory(category);
    }

//    @GetMapping("/countIds")
//    public Long countIds(){
//        return inventoryService.countIds();
//    }



    /*search wit all conditions enabled*/

    @GetMapping("/searchByAllConditions/{category}/{type}/{minPrice}/{maxPrice}")
    public List<InventoryDTO> searchByAllConditions(@PathVariable String category, @PathVariable Double maxPrice, @PathVariable Double minPrice, @PathVariable String type){
        System.out.println(category);
        System.out.println(maxPrice);
        System.out.println(minPrice);
        System.out.println(type);

        return inventoryService.searchByAllConditions(category,type,minPrice,maxPrice);
    }

    /*search by single category*/
    @GetMapping("/searchByCategory/{category}")
    public List<InventoryDTO> searchByCategory(@PathVariable String category){
        System.out.println(category);

        return inventoryService.searchByCategory(category);

    }

    /*search by single type*/
    @GetMapping("/searchByType/{type}")
    public List<InventoryDTO> searchByType(@PathVariable String type){
        System.out.println(type);

        return inventoryService.searchByType(type);

    }

    /*search by single price*/
    @GetMapping("/searchByPrice/{minPrice}/{maxPrice}")
    public List<InventoryDTO> searchByPrice(@PathVariable Double minPrice, @PathVariable Double maxPrice){
        System.out.println(minPrice);
        System.out.println(maxPrice);

        return inventoryService.searchByPrice(minPrice,maxPrice);

    }


   /*search by category and type*/
    @GetMapping("/searchByCategoryAndType/{category}/{type}")
    public List<InventoryDTO> searchByCategoryAndType(@PathVariable String category, @PathVariable String type){
        System.out.println(category);
        System.out.println(type);

        return inventoryService.searchByCategoryAndType(category,type);

    }

    /*search by category and price*/
    @GetMapping("/searchByCategoryAndPrice/{category}/{minPrice}/{maxPrice}")
    public List<InventoryDTO> searchByCategoryAndPrice(@PathVariable String category, @PathVariable Double maxPrice, @PathVariable Double minPrice){
        System.out.println(category);
        System.out.println(minPrice);
        System.out.println(maxPrice);

        return inventoryService.searchByCategoryAndPrice(category,minPrice,maxPrice);

    }

    /*search by type and type*/
    @GetMapping("/searchByTypeAndPrice/{type}/{minPrice}/{maxPrice}")
    public List<InventoryDTO> searchByTypeAndPrice(@PathVariable String type, @PathVariable Double maxPrice, @PathVariable Double minPrice){
        System.out.println(type);
        System.out.println(minPrice);
        System.out.println(maxPrice);

        return inventoryService.searchByTypeAndPrice(type,minPrice,maxPrice);

    }

    @GetMapping("/findByCode/{code}")
    public InventoryDTO findByCode(@PathVariable String code){
        return inventoryService.findByCode(code);
    }


}
