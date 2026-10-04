# Etapa 1: Construcción (Empaquetando tu Vanilla JS y Tailwind)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Producción (Servidor Nginx optimizado para SPA)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Esta línea es vital: Le dice al servidor que si alguien entra directo a una subpágina,
# redirija internamente al index.html para que tu main.js maneje la vista.
RUN echo "server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]