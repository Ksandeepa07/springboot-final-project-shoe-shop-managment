package lk.ijse.gdse.shoe_shop_managment.app.repository;

import lk.ijse.gdse.shoe_shop_managment.app.Embeddable.SalesServicePK;
import lk.ijse.gdse.shoe_shop_managment.app.entity.Inventory;

public interface TopSellingItem {
    Integer getTotal();
    String getItem_id();

}
