package lk.ijse.gdse.shoe_shop_managment.app.service;

import lk.ijse.gdse.shoe_shop_managment.app.dto.InventoryDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SalesServiceDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SellingItemsForADayDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.TopSellingItemDTO;
import lk.ijse.gdse.shoe_shop_managment.app.repository.SellingItemsForADay;

import java.util.List;

public interface DashboardService {

    List<TopSellingItemDTO> mostSaleItem();
    InventoryDTO findByCode(String code);

     TopSellingItemDTO mostSaleItemForADay(String date);

     Integer totalSalesForADay(String date);

     List<SellingItemsForADayDTO> allItemsCodesSellingForADay(String date);
     Long countCustomers();
     Long countEmployees();
     Long countSuppliers();
     Long countOrders();

}
