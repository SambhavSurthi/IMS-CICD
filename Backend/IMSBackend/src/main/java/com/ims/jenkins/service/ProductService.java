package com.ims.jenkins.service;



import java.util.List;

import com.ims.jenkins.entity.Product;

public interface ProductService {
	Product addProduct(Product product);
	List<Product> getAllProducts();
	Product getProductById(Long id);
	Product updateProduct(Long id, Product product);
	Product saveProduct(Product product);
	void deleteProduct(Long id);
}
