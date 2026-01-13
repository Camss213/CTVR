package fr.iut.valence.but.info.ctvr.backend.dto;

import fr.iut.valence.but.info.ctvr.backend.model.Role;
import fr.iut.valence.but.info.ctvr.backend.model.User;

public record UserSummary(Integer id, String username, Role role, String driverName, String drivingLicenceNumber) {
    public User getUser() {
        User user = new User();
        user.setId(this.id);
        user.setUsername(this.username);
        user.setRole(this.role);
        return user;
    }
}
