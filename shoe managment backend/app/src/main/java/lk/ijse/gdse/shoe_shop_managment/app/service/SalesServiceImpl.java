package lk.ijse.gdse.shoe_shop_managment.app.service;

import lk.ijse.gdse.shoe_shop_managment.app.Embeddable.SalesServicePK;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SalesDTO;
import lk.ijse.gdse.shoe_shop_managment.app.dto.SalesServiceDTO;
import lk.ijse.gdse.shoe_shop_managment.app.entity.*;
import lk.ijse.gdse.shoe_shop_managment.app.entity.SalesService;
import lk.ijse.gdse.shoe_shop_managment.app.repository.CustomerRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.InventoryRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.SaleRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.SaleServiceRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service

public class SalesServiceImpl implements lk.ijse.gdse.shoe_shop_managment.app.service.SalesService {
    @Autowired
    private SaleRepo saleRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private SaleServiceRepo saleServiceRepo;

    @Autowired
    private InventoryRepo inventoryRepo;
    @Override
    public boolean saveSale(SalesDTO salesDTO) {

        Customer customer = customerRepo.findById(salesDTO.getCustomerId()).get();
        customer.setCode(customer.getCode());


        saleRepo.save(new Sales(
                    salesDTO.getOrderId(),
                    salesDTO.getOrderDate(),
                    salesDTO.getPaymentMethod(),
                    salesDTO.getTotalPrice(),
                    salesDTO.getAddedPoints(),
                    salesDTO.getCashierName(),
                    customer,
                    salesDTO.getCustomerName()
            ));


        saveSaleService(salesDTO.getOrderId(), salesDTO.getSalesServices());

        updateQuantity(salesDTO.getSalesServices());

return true;
    }



    private void saveSaleService(String orderId, List<SalesServiceDTO> salesServices) {

        List<SalesService> services=new ArrayList<>();

        for (SalesServiceDTO salesService : salesServices) {
            SalesServicePK salesServicePK = new SalesServicePK();
            salesServicePK.setOrder_id(orderId);
            salesServicePK.setItem_id(salesService.getItem_id());

            SalesService service = new SalesService();
            service.setSalesServicePK(salesServicePK);
            service.setName(salesService.getName());
            service.setSize(salesService.getSize());
            service.setUnitPrice(salesService.getUnitPrice());
            service.setItemQty(salesService.getItemQty());
            services.add(service);
        }


         saleServiceRepo.saveAll(services);
    }

    private void updateQuantity(List<SalesServiceDTO> salesServices) {
        for (SalesServiceDTO salesService : salesServices) {
            Inventory inventory = inventoryRepo.findById(salesService.getItem_id()).get();
            List<ShoeSizes> shoeSizes = inventory.getShoeSizes();

            for (ShoeSizes shoeSize : shoeSizes) {
                if(salesService.getSize().equals(shoeSize.getSize())){
                    shoeSize.setQty(shoeSize.getQty()-salesService.getItemQty());
                }
            }
            inventoryRepo.save(inventory);
        }


    }

}
