# Backend--Eureka/eureka-server/Dockerfile
FROM openjdk:17-jdk-slim
COPY target/eureka-0.0.1-SNAPSHOT.jar eureka-server.jar
ENTRYPOINT ["java","-jar","/eureka-server.jar"]