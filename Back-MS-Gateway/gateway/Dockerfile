# Utiliza una imagen base con OpenJDK 17
FROM openjdk:17-jdk-slim

# Configurar el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo pom.xml y las dependencias de Maven
COPY pom.xml ./
COPY src ./src

# Construir el proyecto con Maven
RUN apt-get update && \
    apt-get install -y maven && \
    mvn clean package -DskipTests && \
    mv target/gateway-0.0.1-SNAPSHOT.jar gateway.jar

# Exponer el puerto que usa el Gateway
EXPOSE 8083

# Definir el comando para ejecutar el Gateway
CMD ["java", "-jar", "/app/gateway.jar"]
