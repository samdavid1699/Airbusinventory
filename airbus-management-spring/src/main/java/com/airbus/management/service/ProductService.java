package com.airbus.management.service;

import com.airbus.management.exception.ProductAlreadyExistsException;
import com.airbus.management.model.Product;

import java.util.List;

public interface ProductService {
	
	public List<Product> getAllProducts();
	public List<Product> getProductsByCategory(String categoryName);
	public boolean addProduct(Product productDetails) throws ProductAlreadyExistsException;
	public boolean updateProduct(Product productDetails,String productId);
	public boolean cartProduct(Product productDetails,String productId);
	public boolean deleteProduct(String productId);
}
