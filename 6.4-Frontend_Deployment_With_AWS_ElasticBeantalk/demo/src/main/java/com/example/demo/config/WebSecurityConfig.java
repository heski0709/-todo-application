package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

import com.example.demo.security.JwtAuthenticationFilter;


@EnableWebSecurity
public class WebSecurityConfig {

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Bean
	protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// http 시큐리티 빌더
		http.cors(cors -> cors.and()) // WebMvcConfig에서 이미 설정했으므로 기본 cors 설정.
			.csrf(csrf -> 
					csrf.disable())// csrf는 현재 사용하지 않으므로 disable
			.httpBasic(basic -> 
					basic.disable())// token을 사용하므로 basic 인증 disable
			.sessionManagement(session -> 
					session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // session 기반이 아님을 선언
			.authorizeHttpRequests(authz -> // /와 /auth/** 경로는 인증 안해도 됨.
					authz.antMatchers("/", "/auth/**")
					.permitAll()
					.anyRequest() // /와 /auth/**이외의 모든 경로는 인증 해야됨.
					.authenticated());

		// filter 등록.
		// 매 리퀘스트마다
		// CorsFilter 실행한 후에
		// jwtAuthenticationFilter 실행한다.
		http.addFilterAfter(
						jwtAuthenticationFilter,
						CorsFilter.class
		);

		return http.build();
	}
}
