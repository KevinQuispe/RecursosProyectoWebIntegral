PARA EJECUTAR EL PROYECTO DE MANERA LOCAL CONSDIDERAR LAS SIGUIENTES INSTRUCCIONES:

PASO 1: CONFIGURACION DEL APLICTION PROPERTIES
server.port=8083
spring.application.name=gateway
spring.cloud.gateway.routes[0].id=movie-service
spring.cloud.gateway.routes[0].uri=lb://MOVIE-SERVICE
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/peliculas/
spring.cloud.gateway.routes[1].id=buscador-service
spring.cloud.gateway.routes[1].uri=lb://BUSCADOR-SERVICE
spring.cloud.gateway.routes[1].predicates[0]=Path=/api/buscador/
spring.cloud.gateway.routes[2].id=auth-service
spring.cloud.gateway.routes[2].uri=lb://MOVIE-SERVICE
spring.cloud.gateway.routes[2].predicates[0]=Path=/api/auth/
spring.cloud.gateway.routes[3].id=user-service
spring.cloud.gateway.routes[3].uri=lb://MOVIE-SERVICE
spring.cloud.gateway.routes[3].predicates[0]=Path=/api/user/
spring.cloud.gateway.routes[4].id=compra-service
spring.cloud.gateway.routes[4].uri=lb://MOVIE-SERVICE
spring.cloud.gateway.routes[4].predicates[0]=Path=/api/compras/**
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/
eureka.instance.preferIpAddress=true
logging.level.org.springframework.cloud.gateway=TRACE

PASO 2: CONFIGURACION EN EL ARHIVO APLICATION.YAML
spring:
  application:
    name: gateway
  cloud:
    gateway:
      discovery:
      
        locator:
          enabled: true
      routes:
        - id: movie-service
          uri: lb://MOVIE-SERVICE
          predicates:
            - Path=/api/peliculas/**
        - id: buscador-service
          uri: lb://BUSCADOR-SERVICE
          predicates:
            - Path=/api/buscador/**
        - id: auth-service
          uri: lb://MOVIE-SERVICE
          predicates:
            - Path=/api/auth/**
        - id: user-service
          uri: lb://MOVIE-SERVICE
          predicates:
            - Path=/api/user/**
        - id: compra-service
          uri: lb://MOVIE-SERVICE
          predicates:
            - Path=/api/compras/**
            
eureka:
  client:
    serviceUrl:
      defaultZone: https://backend-eureka-production.up.railway.app/eureka/
  instance:
    preferIpAddress: true
logging:
  level:
    org.springframework.cloud.gateway: DEBUG

