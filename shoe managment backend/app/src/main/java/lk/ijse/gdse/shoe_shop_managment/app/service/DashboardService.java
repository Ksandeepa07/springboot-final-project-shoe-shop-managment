package lk.ijse.gdse.shoe_shop_managment.app.service;

import lk.ijse.gdse.shoe_shop_managment.app.dto.InventoryDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SalesServiceDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.TopSellingItemDTO;

import java.util.List;

public interface DashboardService {

    List<TopSellingItemDTO> mostSaleItem();
    InventoryDTO findByCode(String code);

     TopSellingItemDTO mostSaleItemForADay(String date);

}
