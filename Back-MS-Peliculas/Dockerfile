FROM openjdk:17-jdk-slim
# Copiar el archivo .jar del directorio target
COPY microservicioPeliculas/target/microservicioPeliculas-0.0.1-SNAPSHOT.jar microservicioPeliculas.jar

# Especificar el comando para correr la aplicación
CMD ["java", "-jar", "microservicioPeliculas.jar"]
