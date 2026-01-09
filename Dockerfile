# Stage 1: Build the Angular application
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built application from the build stage
COPY --from=build /app/dist/pdf-to-xml-converter/browser /usr/share/nginx/html

# Nginx image has automatic envsubst support on startup when using /etc/nginx/templates
# It will read files from /etc/nginx/templates/*.template, substitute vars, and output to /etc/nginx/conf.d/
# This is a standard feature of the official nginx docker image.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
