package com.example.nudorms.services;

import com.example.nudorms.models.*;
import com.example.nudorms.repositories.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {
  @Autowired
  StaffRepository staffRepository;
  @Autowired
  BuildingService buildingService;

  public Staff createStaff(Staff staff) {
    return staffRepository.save(staff);
  }

  public List<Staff> findAllStaff() {
    return (List<Staff>) staffRepository.findAll();
  }

  public Staff findStaffByUsername(String username) {
    return staffRepository.findStaffByUsername(username);
  }

  public Integer updateStaff(String username, Staff staff) {
    int usernameIndex = -1;
    List<Staff> staffList = this.findAllStaff();
    for (int i = 0; i < staffList.size(); i++) {
      Staff s = staffList.get(i);
      if (s.getUsername().equals(username)) {
        usernameIndex = i;
        break;
      }
    }

    if (usernameIndex == -1) {
      return 0;
    } else {
      this.deleteStaff(username);
      this.createStaff(staff);
      return 1;
    }
  }

  public Integer deleteStaff(String username) {
    Staff user = this.findStaffByUsername(username);
    staffRepository.deleteById(user.getUsername());
    return 1;
  }

  public Staff login(Staff staff) {
    Staff actualStaff = this.findStaffByUsername(staff.getUsername());
    if (actualStaff != null && actualStaff.getUsername().equals(staff.getUsername())
            && actualStaff.getPassword().equals(staff.getPassword())) {
      return actualStaff;
    } else {
      return null;
    }
  }
}