package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.DriverSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Driver;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface DriverRepository extends Repository<Driver, Integer> {
    void save(Driver driver);

    @Query("select d.drivingLicenceNumber from Driver d join d.user u where u.username = :username")
    String findDrivingLicence(String username);

    @Query("select new fr.iut.valence.but.info.ctvr.backend.dto.DriverSummary(" +
            "d.drivingLicenceNumber, d.firstName, d.lastName, d.phoneNumber, d.email) from Driver d")
    Iterable<DriverSummary> getList();

    Optional<Driver> findByDrivingLicenceNumber(String licence);

    @Modifying
    @Query("update Driver d set d = :driver where d.drivingLicenceNumber = :licence")
    int update(String licence, Driver driver);

    @Modifying
    @Query("update Driver d set d.user.id = :userId where d.drivingLicenceNumber = :licence")
    int updateUserId(String licence, int userId);

    int deleteByDrivingLicenceNumber(String licence);
}
