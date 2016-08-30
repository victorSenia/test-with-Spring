package com.leo.TestTask;

import javax.persistence.EntityNotFoundException;
import javax.validation.ValidationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorAdviser {
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<String> handleNotFound(EntityNotFoundException ex) {
		ResponseEntity<String> responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return responseEntity;
	}

	@ExceptionHandler(ValidationException.class)
	public ResponseEntity<String> handleRuntimeException(ValidationException ex) {
		ResponseEntity<String> responseEntity = new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
		return responseEntity;
	}

}
