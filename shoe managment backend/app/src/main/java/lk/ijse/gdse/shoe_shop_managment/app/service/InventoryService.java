package lk.ijse.gdse.shoe_shop_managment.app.service;

import lk.ijse.gdse.shoe_shop_managment.app.dto.EmployeeDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.InventoryDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SearchDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SupplierDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Inventory;

import java.util.List;

public interface InventoryService {
    InventoryDTO saveInventory(InventoryDTO inventoryDTO);
    InventoryDTO updateInventory(InventoryDTO inventoryDTO);
    boolean deleteInventory(String id);
    List<InventoryDTO> getAllInventory();
    List<InventoryDTO> searchInventory(String name);
    String generateNextId(String variety);
    List<SupplierDTO> loadSupplierCode();

    Long countByCategory(String category);

    List<InventoryDTO> searchByCategory(String category);
    List<InventoryDTO> searchByAllConditions(String category,String type,Double minPrice,Double maxPrice);
    List<InventoryDTO> searchByType(String type);
    List<InventoryDTO> searchByPrice(Double minPrice,Double maxPrice);

    List<InventoryDTO> searchByCategoryAndType(String category,String type);
    List<InventoryDTO> searchByCategoryAndPrice(String category,Double minPrice,Double maxPrice);
    List<InventoryDTO> searchByTypeAndPrice(String type,Double minPrice,Double maxPrice);
}
