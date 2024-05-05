package lk.ijse.gdse.shoe_shop_managment.app.service;

import lk.ijse.gdse.shoe_shop_managment.app.dto.*;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Employee;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Inventory;
import lk.ijse.gdse.shoe_shop_managment.app.entity.ShoeSizes;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Supplier;
import lk.ijse.gdse.shoe_shop_managment.app.repository.InventoryRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.ShoeSizeRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.SupplierRepo;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.DuplicateRecordException;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.event.MouseAdapter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private InventoryRepo inventoryRepo;


    @Autowired
    private SupplierRepo supplierRepo;

    @Autowired
    private ShoeSizeRepo shoeSizeRepo;

    @Override
    public InventoryDTO saveInventory(InventoryDTO inventoryDTO) {

        if (inventoryRepo.existsById(inventoryDTO.getCode())){
            throw new DuplicateRecordException("id");
        }

        Supplier supplier = supplierRepo.findById(inventoryDTO.getSCode()).get();

        Inventory inventory = mapper.map(inventoryDTO, Inventory.class);
        inventory.setSupplier(supplier);
//        inventory.setShoeSizes(inventory.getShoeSizes());

        Inventory save = inventoryRepo.save(inventory);

        saveShoes(inventoryRepo.save(inventory),inventoryDTO.getShoeSizes());
//        System.out.println("hello "+save);
        return mapper.map(save,InventoryDTO.class);

    }

    public void saveShoes(Inventory inventory,List<ShoeSizesDTO> shoeSizesDTOS){

        List<ShoeSizes> shoeSizes = new ArrayList<>();
        for (ShoeSizesDTO shoeSizesDTO : shoeSizesDTOS) {
            ShoeSizes shoeSize = mapper.map(shoeSizesDTO, ShoeSizes.class);
            shoeSize.setInventory(inventory); // Associate with the inventory item
            shoeSizes.add(shoeSize);
        }
        shoeSizeRepo.saveAll(shoeSizes);
    }

    @Override
    public InventoryDTO updateInventory(InventoryDTO inventoryDTO) {
        if (!inventoryRepo.existsById(inventoryDTO.getCode())){
            throw new NotFoundException("id");
        }

        Supplier supplier = supplierRepo.findById(inventoryDTO.getSCode()).get();

        Inventory inventory = mapper.map(inventoryDTO, Inventory.class);
        inventory.setSupplier(supplier);

        Inventory save = inventoryRepo.save(inventory);

        updateShoes(inventory,inventoryDTO.getShoeSizes());

        return mapper.map(save,InventoryDTO.class);
    }

    public void updateShoes(Inventory inventory,List<ShoeSizesDTO> shoeSizesDTOS){

        List<ShoeSizes> shoeSizes = new ArrayList<>();
        for (ShoeSizesDTO shoeSizesDTO : shoeSizesDTOS) {
            ShoeSizes shoeSize = mapper.map(shoeSizesDTO, ShoeSizes.class);
            shoeSize.setInventory(inventory);
            shoeSizes.add(shoeSize);
            }
        shoeSizeRepo.saveAll(shoeSizes);

        }


    @Override
    public boolean deleteInventory(String code) {
        if (!inventoryRepo.existsById(code)){
            throw new NotFoundException("id");
        }

        try {
            shoeSizeRepo.deleteByItemCode(code);
            inventoryRepo.deleteById(code);
            return true;
        }catch (Exception e){
            return false;
        }

    }



    @Override
    public List<InventoryDTO> getAllInventory() {
        return inventoryRepo.findAll()
                .stream()
                .map(inventory -> {
                    InventoryDTO dto = mapper.map(inventory, InventoryDTO.class);
                    dto.setSCode( inventory.getSupplier().getCode());
                    return dto;
                })
                .toList();
    }

    @Override
    public List<InventoryDTO> searchInventory(String name) {
        return inventoryRepo.findByNameStartingWith(name)
                .stream()
                .map(inventory -> {
                    InventoryDTO dto = mapper.map(inventory, InventoryDTO.class);
                    dto.setSCode( inventory.getSupplier().getCode());
                    return dto;
                })
                .toList();
    }

    @Override
    public String generateNextId(String variety) {

            String prefix=variety;
            String id = "";

//            Inventory lastInventory = inventoryRepo.findTopByCodeStartingWith(variety);
            Inventory lastInventory = inventoryRepo.findTopByCodeStartingWithOrderByCodeDesc(variety);
            int nextNumericPart;
            if (lastInventory != null) {
                String lastCode = lastInventory.getCode();
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
    public List<SupplierDTO>  loadSupplierCode() {
       return supplierRepo.findAll().stream().map(supplier -> mapper.map(supplier,SupplierDTO.class)).toList();
    }

    @Override
    public Long countIds() {
       return inventoryRepo.count();
    }

    @Override
    public List<InventoryDTO> searchByCategoryAndSize(SearchDTO searchDTO) {


        return inventoryRepo.findAllByCategoryAndCodeStartingWith(searchDTO.getCategory(),searchDTO.getType())
                .stream()
                .map(inventory -> {
                    InventoryDTO dto = mapper.map(inventory, InventoryDTO.class);
                    dto.setSCode( inventory.getSupplier().getCode());
                    return dto;
                })
                .toList();

    }

    @Override
    public List<InventoryDTO> searchByCategory(String category) {
        System.out.println("service "+category);
        return inventoryRepo.findAllByCategoryStartingWith(category)
                .stream()
                .map(inventory -> {
                    InventoryDTO dto = mapper.map(inventory, InventoryDTO.class);
                    dto.setSCode( inventory.getSupplier().getCode());
                    return dto;
                })
                .toList();
    }

    @Override
    public List<InventoryDTO> searchByAllConditions(String category, String type, Double minPrice, Double maxPrice) {
        return inventoryRepo.findAllByCategoryAndCodeStartingWithAndSalePriceBetween(category,type,minPrice,maxPrice)
                .stream()
                .map(inventory -> {
                    InventoryDTO dto = mapper.map(inventory, InventoryDTO.class);
                    dto.setSCode( inventory.getSupplier().getCode());
                    return dto;
                })
                .toList();
    }










































    /*check with different codes*/

//        if (variety.equals("FSM")) {
//            return generateInventoryId(variety, "FSM");
//        } else if (variety.equals("FSW")) {
//            return generateInventoryId(variety, "FSW");
//        }
//        return null;

//    public String generateInventoryId(String variety, String prefix) {
//        String id = "";
//
//        Inventory lastInventory = inventoryRepo.findTopByCodeStartingWith(variety);
//        int nextNumericPart;
//        if (lastInventory != null) {
//            String lastCode = lastInventory.getCode();
//            String numericPartString = lastCode.substring(prefix.length());
//            try {
//                int numericPart = Integer.parseInt(numericPartString);
//                nextNumericPart = numericPart + 1;
//            } catch (NumberFormatException e) {
//                nextNumericPart = 1;
//            }
//        } else {
//            nextNumericPart = 1;
//        }
//        id = prefix + String.format("%03d", nextNumericPart);
//
//        return id;
//    }

}
