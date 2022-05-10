package com.server.pack;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.io.FileUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sound.midi.SysexMessage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
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

            int test = Integer.parseInt(body.get("level"));

            boolean test1 = (test == 1);

            System.out.println(test1);

            if (Integer.parseInt(body.get("level")) == 1) {
                sql += " (level, userID, userPassword, name, cellphoneNumber ) VALUE (\"" + body.get("level") + "\",\"" + body.get("userID") + "\",\"" + body.get("userPassword") + "\"," +
                        "\"" + body.get("name") + "\"," + body.get("cellphoneNumber") + "\")";
            } else if (Integer.parseInt(body.get("level")) == 2) {
                sql += " (Level, UserID, UserPassword, Name, cellphoneNumber,cellphoneNumber,) VALUE (\"" + body.get("level") + "\", \"" + body.get("userID") + "\",\""
                        + encodedPassword + "\"," + "\"" + body.get("name") + "\"," + body.get("cellphoneNumber") + "\",\"" + body.get("companyName") + "\",\""
                        + body.get("businessName") + "\",\"" + body.get("companyNumber") + "\")";
            }

            System.out.println(sql);

            rs = stmt.executeQuery(sql);

            System.out.println(rs);
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
    public Map<String, Object> GetProductInfo(@RequestBody Map<String, String> body) {
        List result = new ArrayList();
        ResultSet rs = null;
        Map<String, Object> response = new HashMap<>();

        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT PRODUCT_NAME, PRODUCT_PRICE, BRAND_NAME, ORIGIN, PRODUCT_WEIGHT, PRODUCT_LINK, BEST_REVIEW_TEXT, WORST_REVIEW_TEXT, BEST_RATING, WORST_RATING, MAIN_IMAGE_ROUTE, DETAIL_IMAGE_ROUTE FROM TB_PRODUCT WHERE PDC_NUMBER = \"" + body.get("PdcNumber") +"\"";

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
                int bestRating = rs.getInt(9);
                int worstRating = rs.getInt(10);
                String mainImageRoute = rs.getString(11);
                String detailImageRoute = rs.getString(12);

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
                result.add(mainImageRoute);
                result.add(detailImageRoute);
            }
            response.put("data", result);

        } catch ( Exception e ) {};

        return response;
    }

    @RequestMapping(value = "/api/ProductInfo", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String ProductInfo( @RequestParam("mainImageFile") MultipartFile mainImageFile,
                                        @RequestParam("detailImageFile") MultipartFile detailImageFile,
                                        @RequestParam("bestReviewImageFile") MultipartFile bestReviewImageFile,
                                        @RequestParam("worstReviewImageFile") MultipartFile worstReviewImageFile,
                                        @RequestParam String productName,
                                        @RequestParam String productPrice,
                                        @RequestParam String brandName,
                                        @RequestParam String origin,
                                        @RequestParam String bestValue,
                                        @RequestParam String worstValue,
                                        @RequestParam String bestReview,
                                        @RequestParam String worstReview,
                                        @RequestParam String weight,
                                        @RequestParam String productLink,
                                        @RequestParam String kind,
                                        @RequestParam String type) {

        File mainImageTargetFile = new File("../client/public/Image/Product/Main/" + mainImageFile.getOriginalFilename());
        File detailImageTargetFile = new File("../client/public/Image/Product/Detail/" + detailImageFile.getOriginalFilename());
        File bestReviewImageTargetFile = new File("../client/public/Image/Product/BestReview/" + bestReviewImageFile.getOriginalFilename());
        File worstReviewImageTargetFile = new File("../client/public/Image/Product/WorstReview/" + worstReviewImageFile.getOriginalFilename());

        String mainImageRoute = mainImageTargetFile.toString();
        String detailImageRoute = detailImageTargetFile.toString();
        String bestReviewImageRoute = bestReviewImageTargetFile.toString();
        String worstReviewImageRoute = worstReviewImageTargetFile.toString();

        String resultMainImageRoute = mainImageRoute.replaceAll("\\\\", "/");
        String resultDetailImageRoute = detailImageRoute.replaceAll("\\\\", "/");
        String resultBestReviewImageRoute = bestReviewImageRoute.replaceAll("\\\\", "/");
        String resultWorstReviewImageRoute = worstReviewImageRoute.replaceAll("\\\\", "/");

        ResultSet rs = null;

        try {
            InputStream mainImageFileStream = mainImageFile.getInputStream();
            FileUtils.copyInputStreamToFile(mainImageFileStream, mainImageTargetFile);

            InputStream detailImageFileStream = detailImageFile.getInputStream();
            FileUtils.copyInputStreamToFile(detailImageFileStream, detailImageTargetFile);

            InputStream bestReviewImageFileStream = bestReviewImageFile.getInputStream();
            FileUtils.copyInputStreamToFile(bestReviewImageFileStream, bestReviewImageTargetFile);

            InputStream worstReviewImageFileStream = worstReviewImageFile.getInputStream();
            FileUtils.copyInputStreamToFile(worstReviewImageFileStream, worstReviewImageTargetFile);

            try {
                Class.forName(DBDriver);
                Connection conn = DriverManager.getConnection(url, user, password);
                Statement stmt = conn.createStatement();

                String pdcNumber = null;

                String pdc = "SELECT LPAD(COUNT(*)+1,5,'0'), COUNT(*) FROM TB_PRODUCT";   // 문자열

                rs = stmt.executeQuery(pdc);

                while( rs.next() ) {
                    pdcNumber = "PDC-" + rs.getString("LPAD(COUNT(*)+1,5,'0')");
                }

                String sql = "INSERT INTO TB_PRODUCT (PDC_NUMBER, PRODUCT_NAME, PRODUCT_PRICE, BRAND_NAME, ORIGIN, PRODUCT_WEIGHT, PRODUCT_LINK, BEST_REVIEW_TEXT, WORST_REVIEW_TEXT, BEST_RATING, WORST_RATING, KIND, PRODUCT_TYPE, MAIN_IMAGE_ROUTE, DETAIL_IMAGE_ROUTE, BEST_IMAGE_ROUTE, WORST_IMAGE_ROUTE ) VALUES (\""
                        + pdcNumber + "\",\"" + productName +"\","+ productPrice + ",\""+ brandName + "\",\"" + origin + "\",\""
                        + weight + "\",\""+ productLink +"\",\""+ bestReview + "\",\""
                        + worstReview +"\","+ bestValue +"," + worstValue + ",\""
                        + kind + "\",\"" + type + "\",\"" + resultMainImageRoute + "\",\"" + resultDetailImageRoute + "\",\"" + resultBestReviewImageRoute + "\",\"" + resultWorstReviewImageRoute + "\")";

                rs = stmt.executeQuery(sql);

            } catch ( Exception e ) {} ;


        } catch (IOException e) {
            FileUtils.deleteQuietly(mainImageTargetFile);
            e.printStackTrace();

            FileUtils.deleteQuietly(detailImageTargetFile);
            e.printStackTrace();

            FileUtils.deleteQuietly(bestReviewImageTargetFile);
            e.printStackTrace();

            FileUtils.deleteQuietly(worstReviewImageTargetFile);
            e.printStackTrace();
        }
        return "{\"result\": \"OK\"}";
    }

}
