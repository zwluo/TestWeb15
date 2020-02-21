package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomepageController
{
    @GetMapping("/login")
    public String login() {
        System.out.println("login");
        return "login";
    }

    @GetMapping("/index")
    public String index() {
        System.out.println("index");
        return "index";
    }

    @RequestMapping(value = "/console", method = RequestMethod.GET)
    public String console(Model model) {
        System.out.println("console");
        model.addAttribute("name", "Dear");
        return "console";
    }

}
