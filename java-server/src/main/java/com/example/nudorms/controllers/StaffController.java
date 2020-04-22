package com.example.nudorms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.nudorms.models.*;
import com.example.nudorms.services.*;

import java.util.List;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true") // need to specify origin URL to allow cookies
public class StaffController {

  @Autowired
  StaffService staffService;
  @Autowired
  ReviewService reviewService;
  @Autowired
  BuildingService buildingService;

  @PostMapping("/api/staff/register")
  public Staff register(HttpSession session, @RequestBody Staff staff) {
    Staff newStaff = staffService.createStaff(staff);
    newStaff.setPassword("***");
    session.setAttribute("profile", newStaff);
    return newStaff;
  }

  @PostMapping("/api/staff/profile")
  public Staff profile(HttpSession session) {
    Staff profile = (Staff)session.getAttribute("profile");

    // Solve review JSON writing error
    Staff actualStaff = staffService.findStaffByUsername(profile.getUsername());
    // actualStaff.setPassword("***");
    return actualStaff;
  }

  @PostMapping("/api/staff/login")
  public Integer login(HttpSession session, @RequestBody Staff staff) {
    Staff newStaff = staffService.login(staff);
    if (newStaff != null) {
      // newStaff.setPassword("***");
      session.setAttribute("profile", newStaff);
      return 1;
    } else {
      return 0;
    }
  }

  @PostMapping("/api/staff/logout")
  public Staff logout(HttpSession session) {
    Staff loggedOut = (Staff)session.getAttribute("profile");
    session.removeAttribute("profile");
    return loggedOut;
  }

  @GetMapping("/api/staff")
  public List<Staff> findAllStaff() {
    return staffService.findAllStaff();
  }

  @GetMapping("/api/staff/{username}")
  public Staff findStaffByUsername(@PathVariable("username") String username) {
    return staffService.findStaffByUsername(username);
  }

  @PostMapping("/api/staff")
  public Staff createStaff(@RequestBody Staff staff) {
    return staffService.createStaff(staff);
  }

  @PutMapping("/api/staff/{username}")
  public Integer updateStaff(@PathVariable("username") String username, @RequestBody Staff staff) {
    return staffService.updateStaff(username, staff);
  }

  @DeleteMapping("/api/staff/{username}")
  public Integer deleteStaff(@PathVariable("username") String username) {
    return staffService.deleteStaff(username);
  }
}