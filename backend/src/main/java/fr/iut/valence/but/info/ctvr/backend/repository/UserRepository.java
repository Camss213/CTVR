package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.UserSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Role;
import fr.iut.valence.but.info.ctvr.backend.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<User, Integer> {
    Optional<User> findByUsername(String username);

    void save(User user);

    void deleteById(int id);

    @Query("select new fr.iut.valence.but.info.ctvr.backend.dto.UserSummary(" +
            "u.id, u.username, u.role, d.firstName || ' ' || d.lastName, d.drivingLicenceNumber" +
            ") from User u left join Driver d on u.id = d.user.id order by u.username")
    Iterable<UserSummary> getList();

    @Modifying
    @Query("update User u set u.username = :username, u.role = :role where u.id = :id")
    int update(Integer id, String username, Role role);

    @Modifying
    @Query("update User u set u.username = :username where u.username = :oldUsername")
    int updateUsername(String username, String oldUsername);

    @Modifying
    @Query("update User u set u.password = :password where u.username = :username")
    int updatePassword(String username, String password);
}
