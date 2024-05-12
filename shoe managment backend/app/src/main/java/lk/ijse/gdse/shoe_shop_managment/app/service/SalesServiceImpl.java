package lk.ijse.gdse.shoe_shop_managment.app.service;

import lk.ijse.gdse.shoe_shop_managment.app.Embeddable.SalesServicePK;
import lk.ijse.gdse.shoe_shop_managment.app.dto.*;
import lk.ijse.gdse.shoe_shop_managment.app.entity.*;
import lk.ijse.gdse.shoe_shop_managment.app.entity.SalesService;
import lk.ijse.gdse.shoe_shop_managment.app.repository.CustomerRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.InventoryRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.SaleRepo;
import lk.ijse.gdse.shoe_shop_managment.app.repository.SaleServiceRepo;
import lk.ijse.gdse.shoe_shop_managment.app.util.CustomerLoyaltyLevel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    /*sale saving starts here*/
    @Override
    public boolean saveSale(SalesDTO salesDTO) {

//        Customer customer = customerRepo.findById(salesDTO.getCustomerId()).get();
//        customer.setCode(customer.getCode());
//        saleRepo.save(new Sales(
//                    salesDTO.getOrderId(),
//                    salesDTO.getOrderDate(),
//                    salesDTO.getPaymentMethod(),
//                    salesDTO.getTotalPrice(),
//                    salesDTO.getAddedPoints(),
//                    salesDTO.getCashierName(),
//                    customer,
//                    salesDTO.getCustomerName()
//            ));

        Sales Sales = mapper.map(salesDTO, Sales.class);
        if (salesDTO.getCustomerId()==null){
            Sales.setCustomerId(null);
            saleRepo.save(Sales);
            saveSaleService(salesDTO.getOrderId(), salesDTO.getSalesServices());
            updateQuantity(salesDTO.getSalesServices());
        }else{
            Customer customer = customerRepo.findById(salesDTO.getCustomerId()).get();
            customer.setCode(customer.getCode());
            Sales.setCustomerId(customer);
            saleRepo.save(Sales);
            saveSaleService(salesDTO.getOrderId(), salesDTO.getSalesServices());
            updateQuantity(salesDTO.getSalesServices());
            updateCustomer(salesDTO);
        }

//        saveSaleService(salesDTO.getOrderId(), salesDTO.getSalesServices());
//        updateQuantity(salesDTO.getSalesServices());
//        updateCustomer(salesDTO);
        return true;
    }


    private void saveSaleService(String orderId, List<SalesServiceDTO> salesServices) {

        List<SalesService> services=new ArrayList<>();
        for (SalesServiceDTO salesService : salesServices) {
            SalesServicePK salesServicePK = new SalesServicePK();
            salesServicePK.setOrder_id(orderId);
            salesServicePK.setItem_id(salesService.getItem_id());
            salesServicePK.setSize(salesService.getSize());

            SalesService service = new SalesService();
            service.setSalesServicePK(salesServicePK);
            service.setName(salesService.getName());
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
                    if (shoeSize.getQty()>50){
                        shoeSize.setStatus("Available");
                    }if (shoeSize.getQty()<=49 && shoeSize.getQty()>=1){
                        shoeSize.setStatus("Low Stock Available");
                    }if (shoeSize.getQty()==0){
                        shoeSize.setStatus("Not Available");
                    }
                }
            }
            inventoryRepo.save(inventory);
        }
    }

    private void updateCustomer(SalesDTO salesDTO) {
        Customer customer = customerRepo.findById(salesDTO.getCustomerId()).get();
        customer.setRecentPurchaseDate(salesDTO.getOrderDate());

        if (salesDTO.getTotalPrice()>=800){
            customer.setLoyaltyPoints(customer.getLoyaltyPoints()+1);
        }if (customer.getLoyaltyPoints()>=50 && customer.getLoyaltyPoints()<=99){
            customer.setLoyaltyLevel(CustomerLoyaltyLevel.BRONZE);
        }if (customer.getLoyaltyPoints()>=100 && customer.getLoyaltyPoints()<=199){
            customer.setLoyaltyLevel(CustomerLoyaltyLevel.SILVER);
        }if (customer.getLoyaltyPoints()>=200){
            customer.setLoyaltyLevel(CustomerLoyaltyLevel.GOLD);
        }
        customerRepo.save(customer);

    }

    @Override
    public String generateNextId() {
        String prefix = "O";
        String id = "";

        Sales sales = saleRepo.findTopByOrderByOrderIdDesc();
        int nextNumericPart;
        if (sales != null) {
            String lastCode = sales.getOrderId();
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
    public List<SalesDTO> getAllSales() {

        return saleRepo.findAll()
                .stream()
                .map(sales -> {
                    SalesDTO dto =new SalesDTO();
                    dto.setOrderId(sales.getOrderId());
                    dto.setOrderDate(sales.getOrderDate());
                   if (sales.getCustomerId()==null){
                       dto.setCustomerId(null);
                   }else{
                       dto.setCustomerId(sales.getCustomerId().getCode());
                   }

//                    dto.setCustomerId(sales.getCustomerId().getCode());

                    dto.setCustomerName(sales.getCustomerName());
                    dto.setCashierName(sales.getCashierName());
                    dto.setTotalPrice(sales.getTotalPrice());
                    dto.setAddedPoints(sales.getAddedPoints());
                    dto.setPaymentMethod(sales.getPaymentMethod());
//                    List<SalesServiceDTO> list = sales.getSalesServices().stream().map(salesService -> mapper.map(salesService, SalesServiceDTO.class)).toList();
                    List<SalesServiceDTO> list = sales.getSalesServices().stream().map(salesService -> {
                                SalesServiceDTO salesServiceDTO = mapper.map(salesService, SalesServiceDTO.class);
                                salesServiceDTO.setItem_id(salesService.getSalesServicePK().getItem_id());
                                salesServiceDTO.setSize(salesService.getSalesServicePK().getSize());

                        return salesServiceDTO;
                    }).toList();

                    dto.setSalesServices(list);
                    return dto;
                })
                .toList();
    }


    /*sale refund starts here*/

    @Override
    public boolean refundOrDelete(RefundDTO refundDTO) {
        SalesServicePK salesServicePK = new SalesServicePK();
        salesServicePK.setOrder_id(refundDTO.getOrderId());
        salesServicePK.setItem_id(refundDTO.getItemId());
        salesServicePK.setSize(refundDTO.getSize());

        saleServiceRepo.deleteById(salesServicePK);
        updateQtyOnRefund(refundDTO);
//        updateCustomerOnRefund(refundDTO);
        return true;
    }




    private void updateQtyOnRefund(RefundDTO refundDTO) {
        Inventory inventory = inventoryRepo.findById(refundDTO.getItemId()).get();
        Sales sales = saleRepo.findById(refundDTO.getOrderId()).get();
        for (ShoeSizes shoeSize : inventory.getShoeSizes()) {
            if (shoeSize.getInventory().getCode().equals(refundDTO.getItemId()) && shoeSize.getSize().equals(refundDTO.getSize())){
                shoeSize.setQty(shoeSize.getQty()+refundDTO.getQty());
                if (shoeSize.getQty()>50){
                    shoeSize.setStatus("Available");
                }if (shoeSize.getQty()<=49 && shoeSize.getQty()>=1){
                    shoeSize.setStatus("Low Stock Available");
                }if (shoeSize.getQty()==0){
                    shoeSize.setStatus("Not Available");
                }

                /*update sales total price here*/
                sales.setTotalPrice(sales.getTotalPrice()- refundDTO.getPrice());

            }
        }
        inventoryRepo.save(inventory);
        saleRepo.save(sales);
        updateCustomerOnRefund(refundDTO);
    }

    private void updateCustomerOnRefund(RefundDTO refundDTO) {

        Sales sales = saleRepo.findById(refundDTO.getOrderId()).get();
        if (sales.getCustomerId()!=null){
            Customer customer = customerRepo.findById(sales.getCustomerId().getCode()).get();
            if (sales.getTotalPrice()<800){
                System.out.println("lolo");
                customer.setLoyaltyPoints(customer.getLoyaltyPoints()-1);
                customerRepo.save(customer);
            }if (sales.getTotalPrice()==0){
                saleRepo.deleteById(refundDTO.getOrderId());
            }
        }else{
            if (sales.getTotalPrice()==0){
                saleRepo.deleteById(refundDTO.getOrderId());
            }
        }

    }


    /*search order with id*/
    @Override
    public List<SalesDTO> searchByOrderId(String id) {
        return saleRepo.findByOrderIdStartingWith(id)
                .stream()
                .map(sales -> {
                    SalesDTO dto =new SalesDTO();
                    dto.setOrderId(sales.getOrderId());
                    dto.setOrderDate(sales.getOrderDate());
                    if (sales.getCustomerId()==null){
                        dto.setCustomerId(null);
                    }else{
                        dto.setCustomerId(sales.getCustomerId().getCode());
                    }

//                    dto.setCustomerId(sales.getCustomerId().getCode());

                    dto.setCustomerName(sales.getCustomerName());
                    dto.setCashierName(sales.getCashierName());
                    dto.setTotalPrice(sales.getTotalPrice());
                    dto.setAddedPoints(sales.getAddedPoints());
                    dto.setPaymentMethod(sales.getPaymentMethod());
//                    List<SalesServiceDTO> list = sales.getSalesServices().stream().map(salesService -> mapper.map(salesService, SalesServiceDTO.class)).toList();
                    List<SalesServiceDTO> list = sales.getSalesServices().stream().map(salesService -> {
                        SalesServiceDTO salesServiceDTO = mapper.map(salesService, SalesServiceDTO.class);
                        salesServiceDTO.setItem_id(salesService.getSalesServicePK().getItem_id());
                        salesServiceDTO.setSize(salesService.getSalesServicePK().getSize());

                        return salesServiceDTO;
                    }).toList();

                    dto.setSalesServices(list);
                    return dto;
                })
                .toList();

    }



}
