package com.server.pack;

import org.apache.commons.io.FileUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ApiController {
    private static final String DBDriver = "org.mariadb.jdbc.Driver";

    private static final String url = "jdbc:mariadb://127.0.0.1:3306/projectdb";
    private static final String user = "root";
    private static final String password = "-1q2w3e4rfv";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/api/test", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public String GetApiTest() {
        return "{\"result\": \"OK\"}";
    }

    @RequestMapping(value = "/api/getDogBreed", method = RequestMethod.GET)
    public Map<String, Object> GetDogBreed() {
        List result = new ArrayList();
        ResultSet rs = null;
        Map<String, Object> response = new HashMap<>();
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);

            Statement stmt = conn.createStatement();

            String sql = "SELECT id, breed FROM dogbreed";

            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                int id = rs.getInt(1);
                String breed = rs.getString(2);

                result.add(breed);
            }
            response.put("data", result);
        } catch (Exception e) {};

        return response;
    }

    @RequestMapping(value = "/api/getPostTest", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String GetPostTest(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);

            Statement stmt = conn.createStatement();

            String sql = "INSERT INTO dogbreed (BREED) VALUE (\"" + body.get("breed") + "\")";

            rs = stmt.executeQuery(sql);
        } catch (Exception e) {};

        return "{\"result\": \"OK\"}";
    }

    @RequestMapping(value = "/api/ProductInfo", method = RequestMethod.POST) //value 는 요청받을 url , method 는 어떤요청으로 받을지 정의 ex) get post
    @ResponseStatus(value = HttpStatus.OK)
    public String ImportProductInfo(@RequestBody Map<String, Object> requestData) {
        ResultSet rs = null;
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);

            Statement stmt = conn.createStatement();

            String pdcNumber = null;

            String pdc = "SELECT LPAD(COUNT(*)+1,5,'0'), COUNT(*) FROM product";

            rs = stmt.executeQuery(pdc);

            while( rs.next() ) {
                pdcNumber = "PDC-" + rs.getString("LPAD(COUNT(*)+1,5,'0')");
            }

            String sql = "INSERT INTO product (PDC_number, productName, productPrice, brandName, origin, productWeight, productLink, bestReviewText, worstReviewText, bestRating, worstRating, kind, productType ) VALUES (\""
                    + pdcNumber + "\",\"" + requestData.get("productName") +"\","+ requestData.get("productPrice") + ",\""+ requestData.get("brandName")+ "\",\"" + requestData.get("origin") + "\",\""
                    + requestData.get("weight") + "\",\""+ requestData.get("productLink") +"\",\""+ requestData.get("bestReview")+ "\",\""
                    + requestData.get("worstReview") +"\","+ requestData.get("bestValue") +"," + requestData.get("worstValue") + ",\""
                    + requestData.get("animalKind") + "\",\"" + requestData.get("productType") + "\"" + ")";

            System.out.println(sql);

            rs = stmt.executeQuery(sql);
        } catch (Exception e) {};

        return "{\"result\": \"OK\"}";
    }

    @RequestMapping(value = "/api/ProductImageInfo", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String ProductInfo(@RequestParam("file") MultipartFile multipartFile) {
        File targetFile = new File("../client/public/Image/Product/" + multipartFile.getOriginalFilename());
        try {
            InputStream fileStream = multipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
        }
        return "{\"result\": \"OK\"}";
    }

    @RequestMapping(value = "/api/createUser", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String CreateUser(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);

            Statement stmt = conn.createStatement();

            String encodedPassword = passwordEncoder.encode(body.get("userPassword"));


            String sql = "INSERT INTO account";

            if (body.get("level") == "1") {
                sql += "(Level, UserID, UserPassword, Name, cellphoneNumber) VALUE (\"" + body.get("level") + "\",\"" + body.get("userID") + "\",\"" + encodedPassword + "\"," +
                        "\"" + body.get("name") + "\"," + body.get("cellphoneNumber") + "\")";
            } else if (body.get("level") == "2") {
                sql += "(Level, UserID, UserPassword, Name, cellphoneNumber,cellphoneNumber,) VALUE (\"" + body.get("level") + "\", \"" + body.get("userID") + "\",\""
                        + encodedPassword + "\"," + "\"" + body.get("name") + "\"," + body.get("cellphoneNumber") + "\",\"" + body.get("companyName") + "\",\""
                        + body.get("businessName") + "\",\"" + body.get("companyNumber") + "\")";
            }


            rs = stmt.executeQuery(sql);
        } catch (Exception e) {};

        return "{\"result\": \"OK\"}";
    }

    @RequestMapping(value = "/api/Login", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String Login(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT UserPassword FROM account WHERE UserID = \"" + body.get("userID") + "\"";
            rs = stmt.executeQuery(sql);

            String DBPassword = "";
            while(rs.next()) {
                DBPassword = rs.getString(1);
            }

            if(DBPassword == "" ||
                !passwordEncoder.matches(body.get("userPassword"), DBPassword)) {
                return "{\"result\": \"Fail\"}";
            }
        } catch (Exception e) {};

        return "{\"result\": \"OK\"}";
    }

    @RequestMapping(value = "/api/MyPage", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String MyPage(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT UserID FROM account WHERE name = \"" + body.get("name") + "\"";
            rs = stmt.executeQuery(sql);

        } catch (Exception e) {};

        return "{\"result\": \"OK\"}";
    }

    @RequestMapping(value = "/api/GetProductInfo", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Map<String, Object> GetProductInfo() {
        List result = new ArrayList();
        ResultSet rs = null;
        Map<String, Object> response = new HashMap<>();

        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT productName, productPrice, brandName, origin, productWeight, productLink, bestReviewText, worstReviewText, bestRating, worstRating FROM product";

            rs = stmt.executeQuery(sql);

            while ( rs.next() ) {
                String productName = rs.getString(1);
                String productPrice = rs.getString(2);
                String brandName = rs.getString(3);
                String origin = rs.getString(4);
                String productWeight = rs.getString(5);
                String productLink = rs.getString(6);
                String bestReviewText = rs.getString(7);
                String worstReviewText = rs.getString(8);
                String bestRating = rs.getString(9);
                String worstRating = rs.getString(10);

                result.add(productName);
                result.add(productPrice);
                result.add(brandName);
                result.add(origin);
                result.add(productWeight);
                result.add(productLink);
                result.add(bestReviewText);
                result.add(worstReviewText);
                result.add(bestRating);
                result.add(worstRating);
            }
            response.put("data", result);

        } catch ( Exception e ) {};

        return response;
    }

    @RequestMapping(value = "/api/SaveProductImage", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String SaveProductImage(@RequestParam("file") MultipartFile multipartFile) {
        File targetFile = new File("../client/public/Image/Product/" + multipartFile.getOriginalFilename());

        System.out.println(targetFile);
        try {
            InputStream fileStream = multipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);


        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
        }
        return "{\"result\": \"OK\"}";
    }
}
