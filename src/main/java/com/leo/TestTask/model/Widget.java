package com.leo.TestTask.model;

import java.math.BigInteger;
import java.util.Random;

public class Widget {
	private final static Random RANDOM = new Random();

	private String label;

	private int value;

	private String color;

	private String highlight;

	public Widget(Object[] objects) {
		label = (String) objects[1];
		value = ((BigInteger)objects[0]).intValue() ;
		color = highlight = newColor();
	}

	private String newColor() {
		return String.format("#%06X", RANDOM.nextInt(0xFFFFFF));
	}

	public String getLabel() {
		return label;
	}

	public int getValue() {
		return value;
	}

	public String getColor() {
		return color;
	}

	public String getHighlight() {
		return highlight;
	}
}
