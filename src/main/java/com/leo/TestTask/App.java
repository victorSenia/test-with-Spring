package com.leo.TestTask;

import org.springframework.boot.Banner.Mode;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {
	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(App.class);
		application.setBannerMode(Mode.OFF);
		application.run(args);
	}
}
