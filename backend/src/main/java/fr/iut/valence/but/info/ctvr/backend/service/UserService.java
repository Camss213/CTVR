package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.dto.Password;
import fr.iut.valence.but.info.ctvr.backend.dto.UserSummary;
import fr.iut.valence.but.info.ctvr.backend.dto.Username;
import fr.iut.valence.but.info.ctvr.backend.model.User;
import fr.iut.valence.but.info.ctvr.backend.repository.DriverRepository;
import fr.iut.valence.but.info.ctvr.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final DriverRepository driverRepository;
    private final PasswordEncoder passwordEncoder;

    public Iterable<UserSummary> getList() {
        return this.userRepository.getList();
    }

    public void delete(int id) {
        this.userRepository.deleteById(id);
    }

    public void createUser(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        this.userRepository.save(user);
    }

    @Transactional
    public int save(UserSummary summary) throws BadRequestException {
        User user = summary.getUser();

        if (user.getId() == null) {
            user.setPassword(user.getUsername());
            createUser(user);
        } else {
            int rowCount = this.userRepository.update(user.getId(), user.getUsername(), user.getRole());
            if (rowCount != 1) {
                throw new BadRequestException("Utilisateur introuvable");
            }
        }

        if (summary.drivingLicenceNumber() != null) {
            int driverCount = this.driverRepository.updateUserId(summary.drivingLicenceNumber(), user.getId());
            if (driverCount != 1) {
                throw new BadRequestException("Conducteur introuvable");
            }
        }
        return user.getId();
    }

    @Transactional
    public void editUsername(Username user, String oldUsername) throws BadRequestException {
        int count = this.userRepository.updateUsername(user.username(), oldUsername);
        if (count != 1) {
            throw new BadRequestException("Utilisateur introuvable");
        }
    }

    @Transactional
    public void editPassword(String username, Password password) throws BadRequestException {
        String newPassword = this.passwordEncoder.encode(password.password());
        int count = this.userRepository.updatePassword(username, newPassword);
        if (count != 1) {
            throw new BadRequestException("Utilisateur introuvable");
        }
    }
}
