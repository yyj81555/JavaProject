package com.server.pack;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}
