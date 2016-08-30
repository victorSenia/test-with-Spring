package com.leo.TestTask.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.leo.TestTask.model.Browser;
import com.leo.TestTask.model.Widget;
import com.leo.TestTask.repository.BrowserRepository;

@RestController
@RequestMapping(path = "/browser")
public class HomeController {
	@Autowired
	BrowserRepository browserRepository;

	@RequestMapping(path = "", method = RequestMethod.GET)
	public Page<Browser> getAll(Pageable pageable, String search) {
		if (search != null && !search.equals(""))
			return browserRepository
					.findByEngineContainingOrBrowserContainingOrPlatformContainingOrEngineVersionContainingOrCssGradeContaining(
							search, search, search, search, search, pageable);
		return browserRepository.findAll(pageable);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public Browser get(@PathVariable("id") Browser browser) {
		if (browser == null)
			throw new EntityNotFoundException();
		return browser;
	}

	@RequestMapping(path = "/widget", method = RequestMethod.GET)
	public List<Widget> widget() {
		return browserRepository.getWidget().stream().map(o -> new Widget(o))
				.collect(Collectors.toList());
	}

	@RequestMapping(path = "/fill", method = RequestMethod.POST)
	public void fillDatabase(@RequestBody Iterable<Browser> entities) {
		if (browserRepository.count() == 0)
			browserRepository.save(entities);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Browser browser) {
		if (browser == null)
			throw new EntityNotFoundException();
		browserRepository.delete(browser);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.POST)
	public Browser edit(@PathVariable("id") Browser old,
			@RequestBody @Valid Browser browser) {
		if (old == null)
			throw new EntityNotFoundException();
		browser.setId(old.getId());
		browserRepository.save(browser);
		return browser;
	}

	@RequestMapping(path = "", method = RequestMethod.POST)
	public Browser create(@RequestBody @Valid Browser browser) {
		return browserRepository.save(browser);
	}
}
