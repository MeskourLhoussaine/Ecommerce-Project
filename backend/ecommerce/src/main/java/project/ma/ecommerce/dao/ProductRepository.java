package project.ma.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import project.ma.ecommerce.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
