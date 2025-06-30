package org.example.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    @Override
    public void onLogoutSuccess(HttpServletRequest req,
                                HttpServletResponse res,
                                org.springframework.security.core.Authentication authentication) throws IOException {

        String ref = req.getHeader("Referer");
        String redir = "/";

        if (ref != null && !ref.contains("/admin")) {
            redir = ref;
        }

        res.sendRedirect(redir);
    }
}
