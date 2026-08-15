# Spring Boot Integration Guide

## 1. Request/Response DTOs

Create these DTOs to match the frontend request structure:

```java
// src/main/java/com/yourapp/dto/BeamRequest.java
package com.yourapp.dto;

import lombok.Data;

@Data
public class BeamRequest {
    private BeamConfiguration beamConfiguration;
    private OutputConfig output;
}

@Data
class BeamConfiguration {
    private BeamType type;
    private Dimensions dimensions;
}

@Data
class Dimensions {
    private double length;
    private double diameter;
    private double width;
    private double height;
    private double flangeThickness;
    private double webThickness;
}

@Data
class OutputConfig {
    private String fileName;
    private String directory;
}

enum BeamType {
    I_BEAM,
    T_BEAM,
    CIRCULAR,
    RECT
}
```

## 2. REST Controller

```java
// src/main/java/com/yourapp/controller/CadController.java
package com.yourapp.controller;

import com.yourapp.dto.BeamRequest;
import com.yourapp.service.BeamGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cad")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Configure appropriately for production
public class CadController {

    private final BeamGeneratorService beamGeneratorService;

    @PostMapping("/generate-fea")
    public ResponseEntity<byte[]> generateFea(@RequestBody BeamRequest request) {
        try {
            // Generate the STEP file
            byte[] stepFile = beamGeneratorService.generateStepFile(request);
            
            // Set response headers for file download
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", request.getOutput().getFileName());
            headers.setContentLength(stepFile.length);
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(stepFile);
                    
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
```

## 3. Service Layer

```java
// src/main/java/com/yourapp/service/BeamGeneratorService.java
package com.yourapp.service;

import com.yourapp.dto.BeamRequest;
import org.springframework.stereotype.Service;

@Service
public class BeamGeneratorService {

    public byte[] generateStepFile(BeamRequest request) {
        // Your CAD generation logic here
        // This could use OpenCASCADE, FreeCAD API, or any other CAD library
        
        var config = request.getBeamConfiguration();
        var dimensions = config.getDimensions();
        
        switch (config.getType()) {
            case I_BEAM:
                return generateIBeam(dimensions);
            case T_BEAM:
                return generateTBeam(dimensions);
            case CIRCULAR:
                return generateCircular(dimensions);
            case RECT:
                return generateRectangular(dimensions);
            default:
                throw new IllegalArgumentException("Unknown beam type: " + config.getType());
        }
    }
    
    private byte[] generateIBeam(Dimensions d) {
        // Implement I-beam generation
        // Use your CAD library to create the geometry
        // Export to STEP format and return bytes
        return new byte[0]; // Placeholder
    }
    
    private byte[] generateTBeam(Dimensions d) {
        // Implement T-beam generation
        return new byte[0];
    }
    
    private byte[] generateCircular(Dimensions d) {
        // Implement circular beam generation
        return new byte[0];
    }
    
    private byte[] generateRectangular(Dimensions d) {
        // Implement rectangular beam generation
        return new byte[0];
    }
}
```

## 4. CORS Configuration (Alternative to @CrossOrigin)

```java
// src/main/java/com/yourapp/config/CorsConfig.java
package com.yourapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow requests from your Next.js frontend
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",  // Next.js dev server
            "https://your-production-domain.com"
        ));
        
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        
        return new CorsFilter(source);
    }
}
```

## 5. Application Properties

```properties
# src/main/resources/application.properties
server.port=8080

# Increase max file size if generating large STEP files
spring.servlet.multipart.max-file-size=50MB
spring.servlet.multipart.max-request-size=50MB
```

## 6. Running the Integration

### Start your Spring Boot backend:
```bash
cd your-spring-boot-project
./mvnw spring-boot:run
# or
./gradlew bootRun
```

### Start the Next.js frontend:
```bash
cd your-nextjs-project
npm run dev
# or
pnpm dev
```

The Next.js app runs on `http://localhost:3000` and proxies `/api/*` requests to your Spring Boot backend on `http://localhost:8080`.

## 7. Environment Variables

Create a `.env.local` file in your Next.js project:

```env
# Optional: Override backend URL (defaults to http://localhost:8080)
BACKEND_URL=http://localhost:8080

# Or use direct API URL without proxy
# NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 8. Production Deployment

For production, you have two options:

### Option A: Use NEXT_PUBLIC_API_URL
Set the environment variable to point directly to your deployed backend:
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

### Option B: Deploy behind a reverse proxy
Configure your web server (nginx, etc.) to route `/api/*` to your Spring Boot backend.
