package project.ma.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import project.ma.ecommerce.entity.Product;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
        Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
        @RestResource(path = "findByNameContaining", rel = "findByNameContaining")
        Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);

      //  @Query("SELECT p FROM Product p WHERE p.name LIKE %?1%")
      //  List<Product> findByNameContaining(String name);
}
