package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.*;
import com.abhinternship.auctionapp.model.filter.ProductSpecification;
import com.abhinternship.auctionapp.repository.ProductRepository;
import com.abhinternship.auctionapp.repository.UserRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.*;

public class ProductService implements BaseService<Product> {
    @Autowired
    ProductRepository repository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private Cloudinary cloudinaryConfig;

    @Override
    public Product getById(Long requestId) throws RepositoryException {
        Optional<Product> result = repository.findById(requestId);
        try {
            if (result.isPresent()) {
                Product productOptional = result.get();
                return productOptional;
            }
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
        return null;
    }

    @Override
    public boolean create(LinkedHashMap request) throws RepositoryException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Product req = objectMapper.convertValue(request, new TypeReference<Product>() {
            });
            User seller = userRepository.getOneByEmail(req.getUser().getEmail());
            for (int i = 0; i < req.getPhoto().size(); i++) {
                Map uploadResult = cloudinaryConfig.uploader().upload(req.getPhoto().get(i), ObjectUtils.emptyMap());
                uploadResult.get("url").toString();
                req.getPhoto().set(i, uploadResult.get("url").toString());
            }
            req.setStatus("active");
            req.setHighestBid(req.getStartPrice());
            req.setNumberOfBids(0);
            req.setUser(seller);
            repository.save(req);
            System.out.println(req.getPhoto());
            return true;
        } catch (Exception e) {
            throw new RepositoryException("Product can't be created!");
        }
    }

    @Override
    public List<Product> getAll() throws RepositoryException {
        try {
            return repository.findAll();
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    @Override
    public Product update(Long id, LinkedHashMap request) {
        //TODO
        return null;
    }

    @Override
    public void delete(Long productId) throws RepositoryException {
        //TODO
    }

    public List<Product> findAllProductByStartDateDesc(Long pageNumber) throws RepositoryException {
        Pageable page = PageRequest.of(Math.toIntExact(pageNumber), 8);
        try {
            return repository.getAllByOrderByStartDateDesc(page);
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    public List<Product> findAllProductByEndDateAsc(Long pageNumber) throws RepositoryException {
        try {
            Pageable pageable = PageRequest.of(Math.toIntExact(pageNumber), 8);
            return repository.getAllByOrderByEndDateAsc(pageable);
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    public Page<Product> getFilteredProducts(String category, String subcategory, String searchString, String startPrice, String endPrice, String color, String size, Long pageSize, String sortingType, String order) throws RepositoryException {
        try {
            ProductSpecification productSpecification = new ProductSpecification();
            productSpecification.setCategory(category);
            productSpecification.setSubcategory(subcategory);
            productSpecification.setSearchString(searchString);
            productSpecification.setStartPrice(startPrice);
            productSpecification.setEndPrice(endPrice);
            productSpecification.setColor(color);
            productSpecification.setSize(size);
            if (order.equals("ascending")) {
                Pageable pageable = PageRequest.of(0, Math.toIntExact(pageSize), Sort.by(sortingType).ascending());
                return repository.findAll(productSpecification, pageable);
            } else {
                Pageable pageable = PageRequest.of(0, Math.toIntExact(pageSize), Sort.by(sortingType).descending());
                return repository.findAll(productSpecification, pageable);
            }
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    public List<ColorDto> getProductsColor()  {
            return repository.getAllProductsCountedGroupByColor();
    }

    public List<SizeDto> getProductsSize() throws RepositoryException {
        try {
            return repository.getAllProductsCountedGroupBySize();
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    public List<Product> getAllActiveProducts() {
        Date today = new Date(System.currentTimeMillis());
        return repository.findByEndDateAfter(today);
    }

    public List<SubcategoryDto> getDistinctSubcategories(String category) {
        return repository.getAllDistinctCountedGroupBySubcategory(category);
    }

    public List<Double> getAllPrices() {
        return repository.getAllByOrderByHighestBid();
    }

    public List<Product> getAllActiveProductsByUserId(Long userId, Long pageNumber) throws RepositoryException {
        Pageable pageable = PageRequest.of(Math.toIntExact(pageNumber), 5);
        List<Product> userProducts = repository.getAllByUserIdOrderByEndDateDesc(userId, pageable);
        List<Product> activeProducts = new ArrayList<>();
        Date today = new Date(System.currentTimeMillis());
        for (int i = 0; i < userProducts.size(); i++){
            if (userProducts.get(i).getEndDate().compareTo(today) > 0){
                activeProducts.add(userProducts.get(i));
            } else if (userProducts.get(i).getEndDate().compareTo(today) == 0){
                activeProducts.add(userProducts.get(i));
            }
        }
        return activeProducts;
    }

    public List<Product> getAllSoldProductsByUserId(Long userId, Long pageNumber) throws RepositoryException {
        Pageable pageable = PageRequest.of(Math.toIntExact(pageNumber), 5);
        List<Product> userProducts = repository.getAllByUserIdOrderByEndDateAsc(userId, pageable);
        List<Product> soldProducts = new ArrayList<>();
        Date today = new Date(System.currentTimeMillis());
        for (int i = 0; i < userProducts.size(); i++){
            if (userProducts.get(i).getEndDate().compareTo(today) < 0){
                soldProducts.add(userProducts.get(i));
            }
        }
        return soldProducts;
    }

    public BidNotification getBidNotification(BidNotification bidNotification) throws RepositoryException {
        Product product = repository.getOne(bidNotification.getProductId());
        bidNotification.setHighestBid(product.getHighestBid());
        bidNotification.setNumberOfBids(product.getNumberOfBids());
        return bidNotification;
    }
}
