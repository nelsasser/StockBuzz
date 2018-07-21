package com.nelsasser.main.handle;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.InputStream;

public class Handler implements HttpHandler {
    public void handle(HttpExchange httpExchange) throws IOException {
        InputStream inputStream = httpExchange.getRequestBody();

        //set response headers
        httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        if (httpExchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            httpExchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            httpExchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            httpExchange.sendResponseHeaders(204, -1);
            return;
        }
    }

    public void handleRequest(HttpExchange httpExchange, String data) {
        //if data or exchange is null end it all...
        if(data == null || httpExchange == null) {
            throw new IllegalArgumentException("Data is null or Http Exchange is null!");
        }
    }
}
