package learn.covid_customs.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtConverter jwtConverter;

    public SecurityConfig(JwtConverter jwtConverter) {
        this.jwtConverter = jwtConverter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();

        http.cors();


        http.authorizeRequests()

                .antMatchers("/create_account").permitAll()
                .antMatchers("/api/customer/create_account").permitAll()
                .antMatchers("/authenticate").permitAll()

                .antMatchers(HttpMethod.GET,  "/api/customer/*", "/api/customer").permitAll()
                .antMatchers(HttpMethod.GET, "/api/customer/email/*").hasAnyRole("USER", "ADMIN")
//                .antMatchers(HttpMethod.GET, "/api/customer/email/*").permitAll()
                .antMatchers(HttpMethod.POST, "/api/customer").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/customer/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/customer/*").hasAnyRole("USER", "ADMIN")

                .antMatchers(HttpMethod.GET,  "/api/order/*", "/api/order").permitAll()
//                .antMatchers(HttpMethod.GET, "/api/order/customer/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/order/customer/*").permitAll()
//                .antMatchers(HttpMethod.POST, "/api/order").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/api/order").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/order/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/order/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/order/customer/*").hasAnyRole("USER", "ADMIN")

                .antMatchers(HttpMethod.GET, "/api/mask/*", "/api/mask").permitAll()
                .antMatchers(HttpMethod.GET, "/api/mask/admin").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/mask").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/mask/*").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/mask/*").hasRole("ADMIN")
                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), jwtConverter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*");
            }
        };
    }
}
