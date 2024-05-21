package lk.ijse.gdse.shoe_shop_managment.app.service.impl;

import lk.ijse.gdse.shoe_shop_managment.app.dto.InventoryDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SalesServiceDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.TopSellingItemDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.SalesService;
import lk.ijse.gdse.shoe_shop_managment.app.repository.InventoryRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.SaleRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.SaleServiceRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.TopSellingItem;
import lk.ijse.gdse.shoe_shop_managment.app.service.DashboardService;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class
DashboardServiceImpl implements DashboardService {
    @Autowired
    private SaleServiceRepo saleServiceRepo;

    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<TopSellingItemDTO> mostSaleItem() {
//        List<TopSellingItem> topSellingItems = saleServiceRepo.findTopSellingItems();
//        for (TopSellingItem service : topSellingItems) {
//            System.out.println(service.getTotal());
//            System.out.println(service.getItem_id());
//
//        }
        return saleServiceRepo.findTopSellingItems().stream().map(topSellingItem -> mapper.map(topSellingItem,TopSellingItemDTO.class)).toList();
    }

    @Override
    public InventoryDTO findByCode(String code) {
        return mapper.map(inventoryRepo.findById(code),InventoryDTO.class);

    }

    @Override
    public TopSellingItemDTO mostSaleItemForADay(String date) {

        TopSellingItem topSellingItemForTheDay = saleServiceRepo.findTopSellingItemForTheDay(date);
        if (topSellingItemForTheDay==null){
            throw new NotFoundException("No orders");
        }
        return mapper.map(topSellingItemForTheDay,TopSellingItemDTO.class);

    }
}
