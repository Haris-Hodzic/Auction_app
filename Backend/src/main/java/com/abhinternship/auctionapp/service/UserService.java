package com.abhinternship.auctionapp.service;
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
        return null;
    }

    public User checkEmail(String email){
        User emailDb = repository.findByEmail(email);
        if (emailDb==null){
            return new User();
        }else {
            return emailDb;
        }
    }

    @Override
    public User create(LinkedHashMap request) {
        ObjectMapper objectMapper = new ObjectMapper();
        User user;
        User req = objectMapper.convertValue(request, new TypeReference<User>() { });
        req.setPassword(bCryptPasswordEncoder.encode(req.getPassword()));
        repository.save(req);
        return new User();
    }

    @Override
    public List<User> getAll() {
        return repository.findAll();
    }

    @Override
    public User update(Integer id, User request) {
        return null;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.abhinternship.auctionapp.model.User user = repository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                new ArrayList<>());
    }
}
