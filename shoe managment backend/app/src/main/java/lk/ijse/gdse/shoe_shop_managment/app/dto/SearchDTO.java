package lk.ijse.gdse.shoe_shop_managment.app.dto;

import jakarta.validation.constraints.NotBlank;
import lk.ijse.gdse.shoe_shop_managment.app.entity.ShoeSizes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchDTO {
    @NotBlank(message = "cannot be null")
    private String category;
    @NotBlank(message = "cannot be null")
    private String type;

}
