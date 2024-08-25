PARA EJECUTAR EL PROYECTO DE MANERA LOCAL CONSDIDERAR LAS SIGUIENTES INSTRUCCIONES:

PASO 1: CONFIGURACION DEL PROPERTIES
spring:
  application:
    name: gateway
  cloud:
    gateway:
      discovery:

        locator:
          enabled: true
      routes:
       routes:
        
id: movie-service
        uri: lb://MOVIE-SERVICE
        predicates:
Path=/api/peliculas/
    
id: buscador-service
    uri: lb://BUSCADOR-SERVICE
    predicates:
Path=/api/buscador/
id: auth-service
    uri: lb://MOVIE-SERVICE
    predicates:
Path=/api/auth/
id: user-service
uri: lb://MOVIE-SERVICE
predicates:
Path=/api/user/
id: compra-service
uri: lb://MOVIE-SERVICE
predicates:
Path=/api/compras/**
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
  instance:
    preferIpAddress: true
  endpoint:
    gateway:
      enabled: true
logging:
  level:
    org.springframework.cloud.gateway: DEBUG
spring.application.name=buscador-service
spring.elasticsearch.uris=http://localhost:9200/
server.port=8085
spring.main.allow-bean-definition-overriding=true
spring.cloud.compatibility-verifier.enabled=false
logging.level.org.springframework.boot.context.config=DEBUG
logging.level.org.elasticsearch.client=DEBUG
spring.elasticsearch.username=elastic
spring.elasticsearch.password=i9o83so4G2H2tAeO2ei3
logging.level.org.elasticsearch=DEBUG
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.instance.prefer-ip-address=true

PASO 2: CONFIGURACION DEL ARCHIVO APLICATION.YML

spring:
  eureka:
    client:
      service-url:
        defaultZone: https://backend-eureka-production.up.railway.app/eureka
    instance:
      prefer-ip-address: true
logging:
  level:
    org.elasticsearch.client.RestClient: TRACE

