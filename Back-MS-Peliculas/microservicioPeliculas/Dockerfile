FROM openjdk:17-jdk-slim

# Instalar Maven
RUN apt-get update && apt-get install -y maven

# Configurar el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo pom.xml y descargar las dependencias
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copiar el código fuente del proyecto dentro del contenedor
COPY src ./src

# Copia el script wait-for-it.sh al contenedor
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Construir el proyecto con Maven
RUN mvn clean package -DskipTests

# Copiar el archivo JAR resultante al directorio de trabajo
COPY target/microservicioPeliculas-0.0.1-SNAPSHOT.jar microservicio-peliculas.jar

# Exponer el puerto en el que corre el servicio Eureka
EXPOSE 8082


# Especificar el comando para correr la aplicación
CMD ["java", "-jar", "microservicio-peliculas.jar"]
