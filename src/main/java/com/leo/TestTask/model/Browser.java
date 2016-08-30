package com.leo.TestTask.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.validator.constraints.NotBlank;

@Entity(name = "browser")
public class Browser {
	@Id
	@GeneratedValue
	private int id;

	@Column(nullable = false, length = 65)
	@NotBlank
	private String engine;

	@Column(nullable = false, length = 65, unique = true)
	@NotBlank
	private String browser;

	@Column(nullable = false, length = 65)
	@NotBlank
	private String platform;

	@Column(nullable = false, length = 65, name = "engine_version")
	@NotBlank
	private String engineVersion;

	@Column(nullable = false, length = 65, name = "css_grade")
	@NotBlank
	private String cssGrade;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEngine() {
		return engine;
	}

	public void setEngine(String engine) {
		this.engine = engine;
	}

	public String getBrowser() {
		return browser;
	}

	public void setBrowser(String browser) {
		this.browser = browser;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public String getEngineVersion() {
		return engineVersion;
	}

	public void setEngineVersion(String engineVersion) {
		this.engineVersion = engineVersion;
	}

	public String getCssGrade() {
		return cssGrade;
	}

	public void setCssGrade(String cssGrade) {
		this.cssGrade = cssGrade;
	}
}
