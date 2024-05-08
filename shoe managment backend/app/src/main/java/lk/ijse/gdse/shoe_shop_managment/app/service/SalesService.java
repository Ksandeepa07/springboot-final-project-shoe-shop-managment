package lk.ijse.gdse.shoe_shop_managment.app.service;

import jdk.dynalink.linker.LinkerServices;
import lk.ijse.gdse.shoe_shop_managment.app.dto.RefundDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SalesDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Sales;

import java.util.List;

public interface SalesService {
    boolean saveSale(SalesDTO salesDTO);
    String generateNextId();
    List<SalesDTO> getAllSales();

    boolean refundOrDelete(RefundDTO refundDTO);
}
