#  Escuela Management API - Frontend
Este es el cliente web del sistema propuesto en la prueba tecnica

##  Tecnologías Usadas

* **Framework:** React (Vite)
* **Estilos:** Tailwind CSS
* **Cliente HTTP:** Axios
* **Contenedorización:** Docker & Nginx

---

## Guía de Comandos 
1.  `git clone https://github.com/jocano18/school-management-frontend.git` - Clona el repositorio
2.  `docker compose up -d --build ` - Crea la imagen Docker del frontend.
3.  `docker logs -f` - Revisa los logs de la aplicacion.
4.  `docker ps` - Verifica que el contenedor del frontend esté corriendo.
5.  `docker stop <container_id>` - Detiene el contenedor del frontend.
##  Despliegue y Puertos

> ** Importante:** El puerto **3000** debe estar libre. El frontend busca el backend en `http://localhost:8080/api/v1`.


