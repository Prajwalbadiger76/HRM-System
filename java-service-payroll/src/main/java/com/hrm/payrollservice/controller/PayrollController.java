package com.hrm.payrollservice.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @PostMapping("/process")
    public Map<String, Object> processPayroll(@RequestBody Map<String, Object> request) {
        List<Map<String, Object>> employees = (List<Map<String, Object>>) request.get("employees");
        List<Map<String, Object>> results = new ArrayList<>();

        for (Map<String, Object> emp : employees) {
            double salary = Double.parseDouble(emp.get("salary").toString());
            int workingDays = Integer.parseInt(emp.get("workingDays").toString());
            int presentDays = Integer.parseInt(emp.get("presentDays").toString());

            double perDay = salary / workingDays;
            double netSalary = perDay * presentDays;

            Map<String, Object> result = new HashMap<>();
            result.put("employeeId", emp.get("id"));
            result.put("netSalary", netSalary);
            results.add(result);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("processedPayroll", results);

        return response;
    }
}
