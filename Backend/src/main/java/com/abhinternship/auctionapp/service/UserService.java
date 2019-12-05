package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.Address;
import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Service
public class UserService implements BaseService<User>, UserDetailsService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public User getById(Long requestId) {
        //TODO
        return null;
    }

    public boolean checkEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    public boolean create(LinkedHashMap request) throws RepositoryException{
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            User req = objectMapper.convertValue(request, new TypeReference<User>() {
            });
            req.setPassword(bCryptPasswordEncoder.encode(req.getPassword()));
            repository.save(req);
            return true;
        }catch (Exception e){
            throw new RepositoryException("User cannot be created");
        }
    }

    @Override
    public List<User> getAll() throws RepositoryException {
        try {
            return repository.findAll();
        }catch (Exception e){
            throw new RepositoryException("No user found");
        }

    }

    @Override
    public User update(Long user_id, LinkedHashMap request) {
        ObjectMapper objectMapper = new ObjectMapper();
        User req = objectMapper.convertValue(request, new TypeReference<User>() {
        });
        User user = repository.getOne(req.getId());
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setGender(req.getGender());
        user.setPhoneNumber(req.getPhoneNumber());
        user.setEmail(req.getEmail());
        user.setAddress(req.getAddress());
        user.setDateOfBirth(req.getDateOfBirth());
        user.setProfilePhoto(req.getProfilePhoto());
        repository.save(user);
        return user;
    }

    @Override
    public Boolean delete(Long userId) throws RepositoryException {
        //TODO
        return false;
    }

    public User getUserByEmail(String email) throws RepositoryException {
        try {
            return repository.getOneByEmail(email);
        }catch (Exception e){
            throw new RepositoryException("No user found");
        }
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.abhinternship.auctionapp.model.User user = repository.findByEmail(username);
        if (user == null) {
            try {
                throw new RepositoryException("User not found with username: " + username);
            } catch (RepositoryException e) {
                e.printStackTrace();
            }
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                new ArrayList<>());
    }
}
