PARA EJECUTAR EL PROYECTO DE MANERA LOCAL CONSDIDERAR LAS SIGUIENTES INSTRUCCIONES:

PASO 1: CONFIGURACION DEL PROPERTIES
spring.application.name=movie-service
spring.datasource.url=jdbc:mysql://localhost:3306/dbpeliculas
spring.datasource.username = root
spring.datasource.password =
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql = true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.hibernate.ddl-auto = create
