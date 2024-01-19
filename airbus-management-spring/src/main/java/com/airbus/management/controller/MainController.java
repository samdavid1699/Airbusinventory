package com.airbus.management.controller;

import com.airbus.management.exception.ProductAlreadyExistsException;
import com.airbus.management.model.Product;
import com.airbus.management.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/airbusManagement")
public class MainController {
	
	@Autowired
	ProductService productService;
	
	ObjectMapper objectMapper = new ObjectMapper().configure(SerializationFeature.INDENT_OUTPUT, true);
	
	@GetMapping("/getAllProducts")
	public Object getAllProducts(){
		List<Product> result= productService.getAllProducts();
		return result;
	}
	
	@GetMapping("/getProductsByCategory/{key}")
	public Object getProductsByCategory(@PathVariable("key") String categoryName) throws JsonProcessingException{
		
		List<Product> result= productService.getProductsByCategory(categoryName);
		String listToJson = objectMapper.writeValueAsString(result);
		return listToJson;
	}

	@PostMapping("/addProduct")
	public boolean addProduct(@RequestBody Product producDetails) throws JsonProcessingException, ProductAlreadyExistsException{
		
		boolean response = productService.addProduct(producDetails);
		return response;
	}
	
	@PostMapping("updateProduct/{productId}")  
    public boolean updateProduct(@RequestBody Product productDetails,@PathVariable("productId") String productId) {  
        boolean result= productService.updateProduct(productDetails, productId);  
        return result;  
    }
	@PostMapping("cartProduct/{productId}")
	public boolean cartProduct(@RequestBody Product productDetails,@PathVariable("productId") String productId) {
		boolean result= productService.cartProduct(productDetails, productId);
		return result;
	}

	@DeleteMapping("deleteProduct/{productId}")  
    public boolean deleteProduct(@PathVariable("productId") String productId) {  
        boolean result= productService.deleteProduct(productId);  
        return result;  
    } 
	
}
