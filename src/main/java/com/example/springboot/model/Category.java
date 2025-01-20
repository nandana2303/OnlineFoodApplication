package com.example.springboot.model;

import java.util.HashMap;
import java.util.Map;

public enum Category {
    SANDWICH(0),
    VEG(1),
    NONVEG(2),
    DISSERTS(3),
    CHINNES(4),
    PIZZA(5);
	
	

    private int value;
    private static Map map = new HashMap<>();

    private Category(int value) {
        this.value = value;
    }

    static {
        for (Category category : Category.values()) {
            map.put(category.value, category);
        }
    }

    public static Category valueOf(int category) {
        return (Category) map.get(category);
    }

    public int getValue() {
        return value;
    }
}
