package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.dto.DriverSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Driver;
import fr.iut.valence.but.info.ctvr.backend.model.Role;
import fr.iut.valence.but.info.ctvr.backend.model.User;
import fr.iut.valence.but.info.ctvr.backend.repository.DriverRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class DriverService {
    private final DriverRepository repository;
    private final UserService userService;

    public String getDriverLicence(String username) {
        return this.repository.findDrivingLicence(username);
    }

    public Iterable<DriverSummary> getDrivers() {
        return this.repository.getList();
    }

    public Optional<Driver> getDriver(String licence) {
        return this.repository.findByDrivingLicenceNumber(licence);
    }

    @Transactional
    public void create(Driver driver) {
        User user = driver.getUser();
        if (user.getId() == 0) {
            user.setId(null);
            user.setUsername(driver.getFirstName());
            user.setPassword(driver.getFirstName());
            user.setRole(Role.DRIVER);
            this.userService.createUser(user);
        }
        this.repository.save(driver);
    }

    @Transactional
    public void update(Driver driver, String licence) throws BadRequestException {
        int count = this.repository.update(licence, driver);
        if (count != 1) {
            throw new BadRequestException("Conducteur introuvable");
        }
        this.repository.save(driver);
    }

    @Transactional
    public void delete(String licence) throws BadRequestException {
        int count = this.repository.deleteByDrivingLicenceNumber(licence);
        if (count != 1) {
            throw new BadRequestException("Conducteur introuvable");
        }
    }
}
