package com.example.nudorms.repositories;

import com.example.nudorms.models.Staff;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StaffRepository extends CrudRepository<Staff, String> {

  @Query("SELECT staff FROM Staff staff")
  public List<Staff> findAllStaffs();

  @Query("SELECT staff FROM Staff staff WHERE staff.username=:username")
  public Staff findStaffByUsername(@Param("username") String username);
}