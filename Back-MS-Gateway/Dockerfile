# Usar una imagen base de Java
FROM openjdk:17-jdk-alpine
COPY gateway/target/gateway-0.0.1-SNAPSHOT.jar gateway.jar
# Definir el comando para ejecutar el Gateway
CMD ["java", "-jar", "gateway.jar"]
