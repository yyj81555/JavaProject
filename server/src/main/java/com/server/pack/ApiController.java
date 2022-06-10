package com.server.pack;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.*;
import java.util.*;

@RestController
public class ApiController {
    private static final String DBDriver = "org.mariadb.jdbc.Driver";

    private static final String url = "jdbc:mariadb://127.0.0.1:3306/projectdb";
    private static final String user = "root";
    private static final String password = "-1q2w3e4rfv";


    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender javaMailSender;


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
                sql += " (level, userID, userPassword, name, cellphoneNumber, userEmail ) VALUE (\"" + body.get("level") + "\",\"" + body.get("userID") + "\",\"" + encodedPassword + "\"," +
                        "\"" + body.get("name") + "\",\"" + body.get("cellphoneNumber") + "\",\""+ body.get("userEmail") + "\")";
            } else if (Integer.parseInt(body.get("level")) == 2) {
                sql += " (Level, UserID, UserPassword, Name, cellphoneNumber,companyName,businessName,companyNumber,userEmail ) VALUE (\"" + body.get("level") + "\", \"" + body.get("userID") + "\",\""
                        + encodedPassword + "\"," + "\"" + body.get("name") + "\",\"" + body.get("cellphoneNumber") + "\",\"" + body.get("companyName") + "\",\""
                        + body.get("businessName") + "\",\"" + body.get("companyNumber") + "\",\""+ body.get("userEmail") +"\")";
            }

            System.out.println(sql);
            rs = stmt.executeQuery(sql);
        } catch (Exception e) {};

        return "{\"result\": \"OK\"}";
    }



    @RequestMapping(value = "/api/UserIdConfirm", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String UserIdConfirm(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        int Confirm = 0;
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT COUNT(*) FROM account WHERE userId = \"" + body.get("userID") + "\"";

            rs = stmt.executeQuery(sql);

            while (rs.next()) {
                Confirm = rs.getInt("COUNT(*)");
            }

        } catch (Exception e) {};
        if (Confirm == 0) {
            return "{\"result\": \"ok\"}";
        } else {
            return "{\"result\": \"false\"}";
        }
    }

    @RequestMapping(value = "/api/Login", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String Login(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT UserPassword FROM account WHERE UserID = \"" +body.get("user ID") + "\"";
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

    @RequestMapping(value = "/api/GetUserInfo", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Map<String, Object> GetUserInfo(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        Map<String, Object> response = new HashMap<>();
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT LEVEL, USERPASSWORD, NAME, USEREMAIL, CELLPHONENUMBER, COMPANYNAME, BUSINESSNAME," +
                    " COMPANYNUMBER, PETTYPE, PETKIND FROM ACCOUNT WHERE USERID = \"" + body.get("userID")+ "\"";

            rs = stmt.executeQuery(sql);

            while ( rs.next() ) {

                int level = rs.getInt(1);
                String userPassword = rs.getString(2);
                String name = rs.getString(3);
                String userEmail = rs.getString(4);
                String cellphoneNumber = rs.getString(5);
                String companyName = rs.getString(6);
                String businessName = rs.getString(7);
                String companyNumber = rs.getString(8);
                String petType = rs.getString(9);
                String petKind = rs.getString(10);

                response.put("level", level);
                response.put("userPassword", userPassword);
                response.put("name", name);
                response.put("userEmail", userEmail);
                response.put("cellphoneNumber", cellphoneNumber);
                response.put("companyName", companyName);
                response.put("businessName", businessName);
                response.put("companyNumber", companyNumber);
                response.put("petType", petType);
                response.put("petKind", petKind);

            }

        } catch ( Exception e ) {};

        return response;
    }

    @RequestMapping(value = "/api/userInfoChange", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String UserInfoChange(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String encodedPassword = passwordEncoder.encode(body.get("userPassword"));

            String sql = "UPDATE account SET ";

            int test = Integer.parseInt(body.get("level"));

            boolean test1 = (test == 1);

            System.out.println(test1);

            if (Integer.parseInt(body.get("level")) == 1) {
                sql += "name=\"" + (body.get("name")) + "\", userPassword=\"" +  encodedPassword  + "\", " +
                        "cellphoneNumber=\""+ (body.get("cellphoneNumber")) + "\" WHERE userID=\"" + (body.get("userID")) + "\"";
            } else if (Integer.parseInt(body.get("level")) == 2) {
                sql += "companyName=\"" + (body.get("name")) + "\", userPassword=\"" + encodedPassword + "\", " +
                        "cellphoneNumber=\""+ (body.get("cellphoneNumber")) + "\", businessName=\"" + (body.get("businessName")) + "\"," +
                        "companyNumber=\"" + (body.get("companyNumber")) + "\" WHERE userID= \"" + (body.get("userID")) + "\"";
            }

            System.out.println(sql);
            rs = stmt.executeQuery(sql);
        } catch (Exception e) {};

        return "{\"result\": \"OK\"}";
    }

    @RequestMapping(value = "/api/addPet", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String AddPet(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "UPDATE account SET petType=\"" + (body.get("petType")) + "\", petKind=\""+
                    (body.get("petKind")) + "\" WHERE userId=\"" + (body.get("userID")) + "\"";

            System.out.println(sql);
            rs = stmt.executeQuery(sql);
        } catch (Exception e) {};

        return "{\"result\": \"OK\"}";
    }



    @RequestMapping(value = "/api/GetProductInfo", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Map<String, Object> GetProductInfo(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        Map<String, Object> response = new HashMap<>();
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT PRODUCT_NAME, PRODUCT_PRICE, BRAND_NAME, ORIGIN, PRODUCT_WEIGHT, PRODUCT_LINK, BEST_REVIEW_TEXT, WORST_REVIEW_TEXT, BEST_RATING, WORST_RATING, MAIN_IMAGE_ROUTE, DETAIL_IMAGE_ROUTE,BEST_IMAGE_ROUTE,WORST_IMAGE_ROUTE, PRODUCT_TYPE FROM TB_PRODUCT WHERE PDC_NUMBER = \"" + body.get("PdcNumber") +"\"";

            rs = stmt.executeQuery(sql);

            List data = new ArrayList();
            while ( rs.next() ) {
                Map<String, Object> result = new HashMap<>();

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
                String bestImageRoute = rs.getString(13);
                String worstImageRoute = rs.getString(14);

                result.put("productName", productName);
                result.put("productPrice", productPrice);
                result.put("brandName", brandName);
                result.put("origin", origin);
                result.put("productWeight", productWeight);
                result.put("productLink", productLink);
                result.put("bestReviewText", bestReviewText);
                result.put("worstReviewText", worstReviewText);
                result.put("bestRating", bestRating);
                result.put("worstRating", worstRating);
                result.put("mainImageRoute", mainImageRoute);
                result.put("detailImageRoute", detailImageRoute);
                result.put("bestImageRoute", bestImageRoute);
                result.put("worstImageRoute", worstImageRoute);

                data.add(result);
            }

            response.put("data", data);
        } catch ( Exception e ) {};

        return response;
    }

    @RequestMapping(value = "/api/GetSimilarProduct", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Map<String, Object> GetSimilarProduct(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        Map<String, Object> response = new HashMap<>();
        String productType = null;
        int index = 0;
        String typeIndex = null;

        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT PRODUCT_TYPE FROM TB_PRODUCT WHERE PDC_NUMBER = \"" + body.get("PdcNumber") + "\"";

            rs = stmt.executeQuery(sql);

            while ( rs.next() ){
                productType = rs.getString(1);

                index = productType.indexOf(",");

                typeIndex = productType.substring(0, index + 1);
            }

            sql = "SELECT PRODUCT_NAME, PRODUCT_PRICE, BEST_RATING, MAIN_IMAGE_ROUTE, PDC_NUMBER, TOTAL_VALUE " +
                    "FROM " +
                    "(" +
                    "SELECT PRODUCT_NAME, PRODUCT_PRICE, BEST_RATING, MAIN_IMAGE_ROUTE, PDC_NUMBER, BEST_RATING + WORST_RATING AS TOTAL_VALUE " +
                    "FROM TB_PRODUCT " +
                    "WHERE PRODUCT_TYPE LIKE \"" + typeIndex + "%\" AND NOT PDC_NUMBER IN (\""+ body.get("PdcNumber") +"\")" +
                    "ORDER BY TOTAL_VALUE DESC" +
                    ") X " +
                    "LIMIT 0, 10";

            rs = stmt.executeQuery(sql);

            List data = new ArrayList();

            while ( rs.next() ) {

                Map<String, Object> result = new HashMap<>();

                String recomProductName = rs.getString(1);
                String recomProductPrice = rs.getString(2);
                int recomBestRating = rs.getInt(3);
                String recomMainImageRoute = rs.getString(4);
                String recomPdcNumber = rs.getString(5);

                result.put("recomProductName",recomProductName);
                result.put("recomProductPrice",recomProductPrice);
                result.put("recomBestRating",recomBestRating);
                result.put("recomMainImageRoute",recomMainImageRoute);
                result.put("recomPdcNumber",recomPdcNumber);

                data.add(result);
            }

            response.put("data", data);

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

                String pdc = "SELECT LPAD(COUNT(*)+1,5,'0'), COUNT(*) FROM TB_PRODUCT";

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

    @RequestMapping(value = "/api/sendEmail", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String sendMail(@RequestBody Map<String, String> body) {
        ArrayList<String> toUserList = new ArrayList<>();

        String toEmail = body.get("email");

        Random random = new Random();
        int tempRandomNumber = random.nextInt(888888) + 111111;

        String authenticationNumber = Integer.toString(tempRandomNumber);


        //수신 대상 추가
        toUserList.add(toEmail);
        //수신 대상 개수
        int toUserSize = toUserList.size();

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));

        simpleMailMessage.setSubject("회원가입 인증 코드 발급 안내입니다.");
        simpleMailMessage.setText("인증번호는 "+ authenticationNumber + " 입니다.");

        //javaMailSender.send(simpleMailMessage);

        return authenticationNumber;
    }

    @RequestMapping(value = "/api/GetProduct", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Map<String, Object> GetProduct() {
        ResultSet rs = null;
        Map<String, Object> response = new HashMap<>();
        List data = new ArrayList();
        try{
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT PDC_NUMBER, PRODUCT_NAME, MAIN_IMAGE_ROUTE, BRAND_NAME, KIND, PRODUCT_TYPE FROM TB_PRODUCT";

            rs = stmt.executeQuery(sql);

            while ( rs.next() ){
                Map<String, Object> result = new HashMap<>();

                String pdcNumber = rs.getString(1);
                String productName = rs.getString(2);
                String mainImageRoute = rs.getString(3);
                String brand = rs.getString(4);
                String kind = rs.getString(5);
                String productType = rs.getString(6);

                result.put("pdcNumber",pdcNumber);
                result.put("productName",productName);
                result.put("mainImageRoute",mainImageRoute);
                result.put("brand",brand);
                result.put("kind",kind);
                result.put("productType",productType);

                data.add(result);
            }

            response.put("data", data);

        } catch ( Exception e) {}

        return response;
    }

    @RequestMapping(value = "/api/AddFavoriteProduct", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String AddFavoriteProduct(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        String pushFavoriteProduct = "";
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT FAVORITE_PRODUCT FROM account WHERE userID = \"" + body.get("id") + "\"";

            rs = stmt.executeQuery(sql);

            while ( rs.next() ){
                pushFavoriteProduct = rs.getString(1);
            }

            if( pushFavoriteProduct == null) {
                pushFavoriteProduct = body.get("PdcNumber");
            }else{
                pushFavoriteProduct += ","+body.get("PdcNumber");
            }

            sql = "UPDATE account SET FAVORITE_PRODUCT = \"" + pushFavoriteProduct + "\" WHERE userId = \"" + body.get("id") + "\"";

            rs = stmt.executeQuery(sql);

        } catch ( Exception e ) {}
        return "ok";
    }


    @RequestMapping(value = "/api/RemoveFavoriteProduct", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String RemoveFavoriteProduct(@RequestBody Map<String, Object> body) {
        ResultSet rs = null;

        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "UPDATE account SET FAVORITE_PRODUCT=\"" + body.get("favoriteProduct") +"\"WHERE userID = \""+ body.get("id") +"\"" ;

            rs = stmt.executeQuery(sql);
        } catch ( Exception e ) {}

        return "ok";
    }

    @RequestMapping(value ="/api/getFavoriteProduct", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String[] getFavoriteProduct(@RequestBody Map<String, String> body) {
        ResultSet rs = null;
        String pushFavoriteProduct = "";
        String[] response = null;

        try{
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT FAVORITE_PRODUCT FROM account WHERE userId = \"" + body.get("id") + "\"";

            rs = stmt.executeQuery(sql);

            while ( rs.next() ) {
                pushFavoriteProduct = rs.getString(1);
            }
            response = pushFavoriteProduct.split(",");

        } catch ( Exception e ){}

        return  response;
    }

    @RequestMapping(value = "/api/GetFavoriteCount", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String GetFavoriteCount(@RequestBody Map<String, String>body){
        ResultSet rs = null;
        String favoriteCount = "";
        try{
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT FAVORITE_PRODUCT FROM ACCOUNT WHERE USERID = \"" + body.get("userId") + "\"";

            rs = stmt.executeQuery(sql);

            while ( rs.next() ){
                favoriteCount = rs.getString(1);
            }
        } catch ( Exception e ){}

        return favoriteCount;
    }

    @RequestMapping(value ="/api/GetImageRoute", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Map<String, Object> GetImageRoute(@RequestBody Map<String, Object>body){
        ResultSet rs = null;
        List data = new ArrayList();
        Map<String, Object> response = new HashMap<>();

        String[] list = body.get("pdcNumber").toString().split(",");
        int count = Integer.parseInt(body.get("count").toString());
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            Map<String, Object> result = new HashMap<>();

            for( var i=0; i<count; i++) {
                String sql = "SELECT MAIN_IMAGE_ROUTE FROM TB_PRODUCT WHERE PDC_NUMBER =\"" + list[i] + "\"";

                rs = stmt.executeQuery(sql);

                while ( rs.next() ){
                    String mainImageRoute = rs.getString(1);

                    System.out.println(mainImageRoute);

                    data.add(mainImageRoute +","+ list[i]);

                    System.out.println(data);
                }
            }

        } catch ( Exception e ){}

        response.put("data", data);

        return response;
    }

    @RequestMapping(value = "/api/KakaoLogin", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String KakaoLogin(@RequestBody Map<String, String>body) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        String result = null;
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=3a80fea018fc149a49837a8d88094df5"); // TODO REST_API_KEY 입력
            sb.append("&redirect_uri=http://localhost:3000/KakaoCode"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + body.get("code"));
            bw.write(sb.toString());
            bw.flush();

            int responseCode = conn.getResponseCode();
            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }


        } catch (Exception e) {
        }
        return result;
    }

    @RequestMapping(value = "/api/GetKakaoUserInfo", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String GetKakaoUserInfo(@RequestBody Map<String, String>body) {

        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        String result = "";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            conn.setRequestProperty("Authorization", "Bearer " + body.get("token"));

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

        } catch (Exception e) {
        }

        return result;
    }

    @RequestMapping(value = "/api/CheckUserInfo", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public int CheckUserInfo(@RequestBody Map<String, String>body){
        System.out.println(body.get("id"));
        ResultSet rs = null;
        int check = 0;
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "SELECT EXISTS( SELECT USERID FROM ACCOUNT WHERE USERID = \"" + body.get("id") + "\" )";

            rs = stmt.executeQuery(sql);

            while ( rs.next() ) {
                check = rs.getInt(1);
            }

            System.out.println(check); // data가 존재하면 1  아니라면 0;
        } catch ( Exception e ) {}

        return check;
    }

    @RequestMapping(value = "/api/CreatKakaoUser", method =  RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public String CreatKakaoUser(@RequestBody Map<String, String>body){
        System.out.println(body.get("ID"));
        System.out.println(body.get("email"));
        System.out.println(body.get("name"));
        System.out.println(body.get("cellPhone"));

        ResultSet rs = null;

        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();

            String sql = "INSERT INTO account";

            if( Integer.parseInt(body.get("level")) == 1 ) {
                sql += " (level, userID, name, cellphoneNumber, userEmail ) VALUE (\"" + body.get("level") + "\",\"" + body.get("ID") + "\"," +
                        "\"" + body.get("name") + "\",\"" + body.get("cellPhone") + "\",\""+ body.get("email") + "\")";
            }else if ( Integer.parseInt(body.get("level")) == 2 ){
                sql += " (Level, UserID, Name, cellphoneNumber,companyName,businessName,companyNumber,userEmail ) VALUE (\"" + body.get("level") + "\", \"" + body.get("ID") + "\","
                        + "\"" + body.get("name") + "\",\"" + body.get("cellPhone") + "\",\"" + body.get("companyName") + "\",\""
                        + body.get("businessName") + "\",\"" + body.get("companyNumber") + "\",\""+ body.get("email") +"\")";
            }

            System.out.println(sql);
            rs = stmt.executeQuery(sql);

        } catch ( Exception e ) {}
        return "ok";
    }
}
