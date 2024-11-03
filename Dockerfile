# build environment
FROM node:20.18.0-alpine AS build
ARG DB_HOST
ARG LOCATION_ELEVATION
ARG LOCATION_LATITUDE
ARG LOCATION_LONGITUDE
WORKDIR /app
ENV VITE_INFLUX_DB_HOST=$DB_HOST
ENV VITE_LOCATION_ELEVATION=$LOCATION_ELEVATION
ENV VITE_LOCATION_LATITUDE=$LOCATION_LATITUDE
ENV VITE_LOCATION_LONGITUDE=$LOCATION_LONGITUDE
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
ENV NODE_ENV=production
RUN npm run build
RUN chmod -R o+rx /app/dist

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
