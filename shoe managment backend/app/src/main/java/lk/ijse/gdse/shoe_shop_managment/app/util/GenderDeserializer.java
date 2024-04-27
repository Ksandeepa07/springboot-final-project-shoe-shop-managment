//package lk.ijse.gdse.shoe_shop_managment.app.util;
//
//import com.fasterxml.jackson.core.JacksonException;
//import com.fasterxml.jackson.core.JsonParser;
//import com.fasterxml.jackson.databind.DeserializationContext;
//import com.fasterxml.jackson.databind.JsonDeserializer;
//import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
//
//import java.io.IOException;
//@JsonDeserialize
//public class GenderDeserializer extends JsonDeserializer<CustomerGender> {
//    @Override
//    public CustomerGender deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
//        String value = jsonParser.getText();
//        if ("Male".equalsIgnoreCase(value)) {
//            return CustomerGender.MALE;
//        } else if ("Female".equalsIgnoreCase(value)) {
//            return CustomerGender.FEMALE;
//        }
//        throw new IllegalArgumentException("Invalid gender value: " + value);
//    }
//    }
