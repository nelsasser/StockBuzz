package com.nelsasser.main;

import com.sun.net.httpserver.*;

import java.io.IOException;
import java.net.InetSocketAddress;
import com.nelsasser.main.handle.Handler;

public class main {

    public static void main(String[] args) {

        try {
            int port = 5000;
            HttpServer server = HttpServer.create(new InetSocketAddress(port), 100);
            server.createContext("/", new Handler());
            server.setExecutor(null);
            server.start();
            System.out.println("Successfully started server at port:" + port);
        } catch (IOException e) {
            System.out.println("Failed to create server");
            System.err.println(e);
        }
    }
}
