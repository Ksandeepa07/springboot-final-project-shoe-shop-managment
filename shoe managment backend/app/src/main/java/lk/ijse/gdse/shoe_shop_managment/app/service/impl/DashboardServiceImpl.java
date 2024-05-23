package lk.ijse.gdse.shoe_shop_managment.app.service.impl;

import lk.ijse.gdse.shoe_shop_managment.app.dto.InventoryDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SalesServiceDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SellingItemsForADayDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.TopSellingItemDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.SalesService;
import lk.ijse.gdse.shoe_shop_managment.app.repository.*;
import lk.ijse.gdse.shoe_shop_managment.app.service.DashboardService;
import lk.ijse.gdse.shoe_shop_managment.app.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {
    @Autowired
    private SaleServiceRepo saleServiceRepo;

    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private SaleRepo saleRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private SupplierRepo supplierRepo;

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

    @Override
    public Integer totalSalesForADay(String date) {
        Integer total = saleRepo.totalSalesForADay(date);
        System.out.println(total);
        return total;

    }

    @Override
    public List<SellingItemsForADayDTO> allItemsCodesSellingForADay(String date) {
        return saleServiceRepo.findAllTHeItemsSellingForADay(date).stream().map(sellingItemsForADay -> mapper.map(sellingItemsForADay,SellingItemsForADayDTO.class)).toList();
    }

    @Override
    public Long countCustomers() {
        return customerRepo.count();
    }

    @Override
    public Long countEmployees() {
        return employeeRepo.count();
    }

    @Override
    public Long countSuppliers() {
        return supplierRepo.count();
    }

    @Override
    public Long countOrders() {
        return saleRepo.count();
    }
}
