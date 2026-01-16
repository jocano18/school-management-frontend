# ETAPA 1: Construcción (Build)
FROM node:18-alpine AS build

WORKDIR /app

# Copiamos archivos de configuración para instalar dependencias primero (cache)
COPY package.json package-lock.json ./
RUN npm install

# Copiamos todo el código fuente
COPY . .

# Construimos la aplicación (genera la carpeta /dist)
RUN npm run build

# Servidor de Producción
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]