package lk.ijse.gdse.shoe_shop_managment.app.controller;

import lk.ijse.gdse.shoe_shop_managment.app.dto.CustomerDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.RefundDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SalesDTO;
import lk.ijse.gdse.shoe_shop_managment.app.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/sales")
@CrossOrigin(origins = "*")
public class SalesController {
    @Autowired
    private SalesService salesService;

    public SalesController() {
        System.out.println("working");
    }

    @PostMapping("/save")
    public boolean save(@RequestBody SalesDTO salesDTO){
        System.out.println(salesDTO);
       return salesService.saveSale(salesDTO);


    }

    @GetMapping("/nextId")
    public String generateNextId(){
        return salesService.generateNextId();

    }

    @GetMapping("/getAll")
    public List<SalesDTO> getAll(){
        return salesService.getAllSales();

    }

    @PatchMapping("/refundOrDelete")
    public boolean refundOrDelete(@RequestBody RefundDTO refundDTO){
        System.out.println(refundDTO);
        return salesService.refundOrDelete(refundDTO);
    }

}
