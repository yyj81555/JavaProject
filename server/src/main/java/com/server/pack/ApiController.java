package com.server.pack;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

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
    @ResponseStatus(value = HttpStatus.OK)
    public String GetDogBreed() {
        String result = "";
        try {
            Class.forName(DBDriver);
            Connection conn = DriverManager.getConnection(url, user, password);

            Statement stmt = conn.createStatement();

            String sql = "SELECT id, breed FROM dogbreed";

            ResultSet rs = stmt.executeQuery(sql);

            while(rs.next()) {
                int id = rs.getInt(1);
                String breed = rs.getString(2);

                result += id + " : " + breed + "\n";
            }
        } catch (Exception e) {};

        return result;
    }
}
