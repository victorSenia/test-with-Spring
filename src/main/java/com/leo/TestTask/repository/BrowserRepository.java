package com.leo.TestTask.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.leo.TestTask.model.Browser;

public interface BrowserRepository extends CrudRepository<Browser, Integer> {

	public Page<Browser> findAll(Pageable pageable);

	@Query(nativeQuery = true, value = "SELECT count(id) AS value, engine AS label FROM browser GROUP BY engine")
	public List<Object[]> getWidget();

	public Page<Browser> findByEngineContainingOrBrowserContainingOrPlatformContainingOrEngineVersionContainingOrCssGradeContaining(
			String engine, String browser, String platform, String vertion, String css, Pageable pageable);

}
