PARA EJECUTAR EL PROYECTO DE MANERA LOCAL CONSDIDERAR LAS SIGUIENTES INSTRUCCIONES:

PASO 1: CONFIGURACION DEL PROPERTIES
spring.application.name=eureka
eureka.client.service-url.defaultZone=http://localhost:8761/eureka
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=true
eureka.instance.preferIpAddress=true
#Actuator
management.endpoints.jmx.exposure.include=health,info,env,beans
management.endpoints.web.exposure.include=health,info,env,beans

