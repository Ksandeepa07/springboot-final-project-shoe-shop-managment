package lk.ijse.gdse.shoe_shop_managment.app.controller;

import lk.ijse.gdse.shoe_shop_managment.app.dto.InventoryDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SalesServiceDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SellingItemsForADayDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.TopSellingItemDTO;
import lk.ijse.gdse.shoe_shop_managment.app.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ListIterator;

@RestController
@RequestMapping("api/v1/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/mostSalesItem")
    public List<TopSellingItemDTO> mostSaleItem(){
       return dashboardService.mostSaleItem();

    }


    @GetMapping("/findByCode/{code}")
    public InventoryDTO findByCode(@PathVariable String code){
        return dashboardService.findByCode(code);

    }


    @GetMapping("/mostSaleItemForADay/{date}")
    public TopSellingItemDTO mostSaleItemForADay(@PathVariable String date){
        return dashboardService.mostSaleItemForADay(date);

    }

    @GetMapping("/totalSalesForADay/{date}")
    public Integer totalSalesForADay(@PathVariable String date){
        return dashboardService.totalSalesForADay(date);

    }

    @GetMapping("/allItemsCodesSellingForADay/{date}")
    public List<SellingItemsForADayDTO> allItemsCodesSellingForADay(@PathVariable String date){
        return dashboardService.allItemsCodesSellingForADay(date);

    }

    @GetMapping("/countCustomers")
    public Long countCustomers(){
        return dashboardService.countCustomers();

    }

    @GetMapping("/countEmployees")
    public Long countEmployees(){
        return dashboardService.countEmployees();

    }

    @GetMapping("/countSuppliers")
    public Long countSuppliers(){
        return dashboardService.countSuppliers();

    }

    @GetMapping("/countOrders")
    public Long countOrders(){
        return dashboardService.countOrders();

    }
}
