package com.ims.jenkins.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.jenkins.entity.Product;
import com.ims.jenkins.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{
	
	
	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public Product addProduct(Product product)
	{
		return productRepository.save(product);
		
	}
	
	@Override
	public Product saveProduct(Product product) {
	    return productRepository.save(product);
	}


	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product getProductById(Long id) {
		return productRepository.findById(id).orElseThrow(()->new RuntimeException("Product Not Found By "+id));
	}

	@Override
	public Product updateProduct(Long id, Product product) {
		Product exist=getProductById(id);
		exist.setName(product.getName());
		exist.setQuantity(product.getQuantity());
		exist.setPrice(product.getPrice());
		return productRepository.save(exist);
		
	}

	@Override
	public void deleteProduct(Long id) {
		productRepository.deleteById(id);
		
		
	}

}
