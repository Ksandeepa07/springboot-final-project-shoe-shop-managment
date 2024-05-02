package lk.ijse.gdse.shoe_shop_managment.app.service;

import lk.ijse.gdse.shoe_shop_managment.app.dto.InventoryDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SupplierDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Employee;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Inventory;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Supplier;
import lk.ijse.gdse.shoe_shop_managment.app.repository.InventoryRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.SupplierRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.event.MouseAdapter;
import java.util.ArrayList;
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

    @Override
    public InventoryDTO saveInventory(InventoryDTO inventoryDTO) {

        System.out.println("serivecce "+inventoryDTO);
        Supplier supplier = supplierRepo.findById(inventoryDTO.getSCode()).get();

//        System.out.println(supplier.getCode());
//        System.out.println(supplier.getName());

        Inventory inventory = mapper.map(inventoryDTO, Inventory.class);
        inventory.setSupplier(supplier);

//        Inventory save = inventoryRepo.save(inventory);
//        InventoryDTO send= mapper.map(inventoryRepo.save(inventory),InventoryDTO.class);
//        send.setSCode(String.valueOf(save.getSupplier()));
//
//        return send;

        return mapper.map(inventoryRepo.save(inventory),InventoryDTO.class);


    }

    @Override
    public InventoryDTO updateInventory(InventoryDTO inventoryDTO) {
        return null;
    }

    @Override
    public boolean deleteInventory(String id) {
        return false;
    }

    @Override
    public List<InventoryDTO> getAllInventory() {
//        List<Inventory> list = inventoryRepo.findAll();
//        List<InventoryDTO> inventoryDTOS = new ArrayList<>();
//
//        for (Inventory inventory : list) {
//            inventoryDTOS.add(new InventoryDTO(
//                   inventory.getCode(),
//                   inventory.getName(),
//                   inventory.getItemPic(),
//                   inventory.getCategory(),
//                   inventory.getSize(),
//                   inventory.getSalePrice(),
//                   inventory.getBuyPrice(),
//                   inventory.getProfit(),
//                   inventory.getProfitMargin(),
//                   inventory.getStatus(),
//                   inventory.getQty(),
//                    inventory.getSupplier().getCode(),
//                    inventory.getSName()
//            ));
//        }
//        return inventoryDTOS;
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
        return null;
    }

    @Override
    public String generateNextId(String variety) {

            String prefix=variety;
            String id = "";

            Inventory lastInventory = inventoryRepo.findTopByCodeStartingWith(variety);
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
