package com.votacao.app.config.cors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow credentials
        config.setAllowCredentials(true);

        // Permitir requisições  de Angular local
        config.addAllowedOrigin("http://localhost:4200");

        // Permitir todos os headers
        config.addAllowedHeader("*");

        // Permitir todos os métodos http
        config.addAllowedMethod("*");

        // Permitir credenciais (cookies, authorization headers)
        config.setAllowCredentials(true);

        // Expor headers de resposta
        config.setExposedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept",
                "X-Requested-With"
        ));

        // Configurar o tempo de cache para preflight requests
        config.setMaxAge(3600L);

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
