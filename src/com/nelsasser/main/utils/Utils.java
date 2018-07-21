package com.nelsasser.main.utils;

import java.io.InputStream;

public class Utils {

    public static String streamToString(InputStream stream) {
        java.util.Scanner s = new java.util.Scanner(stream);
        return s.hasNext() ? s.next() : "";
    }
}
