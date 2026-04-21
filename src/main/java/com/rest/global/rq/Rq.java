package com.rest.global.rq;

import com.rest.domain.member.entity.Member;
import com.rest.global.security.SecurityUser;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;
import java.util.Optional;

@Component
@RequestMapping
@RequiredArgsConstructor
public class Rq {
    private final HttpServletResponse resp;
    private final HttpServletRequest req;
    private final EntityManager entityManager;
    private Member member;

    public void setCrossDomainCookie(String tokenName, String token) {
        ResponseCookie cookie = ResponseCookie.from(tokenName, token)
                .path("/")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .build();
        resp.addHeader("Set-Cookie", cookie.toString());
    }

    public void removeClearDomainCookie(String tokenName) {

        ResponseCookie cookie = ResponseCookie.from(tokenName, null)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .build();
        resp.addHeader("Set-Cookie", cookie.toString());
    }

    public String getCookie(String name){
        Cookie[] cokkies = req.getCookies();

        return Arrays.stream(cokkies)
                .filter(cookie -> cookie.getName().equals(name))
                .findFirst()
                .map(Cookie::getValue)
                .orElse("");

    }

    public Member getMember() {
        if (isLogout()) return null;
        if (member == null) {
            member = entityManager.getReference(Member.class, getUser().getId());
        }
        return member;
    }

    public void setLogin(SecurityUser securityUser) {
        SecurityContextHolder.getContext().setAuthentication(securityUser.getAuthentication());
    }

    private SecurityUser getUser() {
        return Optional.ofNullable(SecurityContextHolder.getContext())
                .map(context -> context.getAuthentication())
                .filter(authentication -> authentication.getPrincipal() instanceof User)
                .map(authentication -> (SecurityUser) authentication.getPrincipal())
                .orElse(null);
    }
    private boolean isLogin() {
        return getUser() != null;
    }
    private boolean isLogout() {
        return !isLogin();
    }
}
