# Etapa 1: Construcción (Build)
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código y construir la aplicación
# Las variables de entorno de Vite (.env) serán inyectadas durante el build
COPY . .
RUN npm run build

# Etapa 2: Servidor (Production)
FROM nginx:alpine

# Copiar los archivos compilados desde la etapa de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar Nginx para que funcione correctamente con React Router (SPA)
# Esto asegura que si recargas la página en /items, no te dé error 404
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
