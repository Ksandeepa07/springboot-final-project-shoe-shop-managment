package lk.ijse.gdse.shoe_shop_managment.app.service;

public interface EmailService {
    boolean sendSimpleMessage(String to, String subject, String text);
    boolean sendBirthdayEmails();
}
