package com.ims.jenkins.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ims.jenkins.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
	

}
