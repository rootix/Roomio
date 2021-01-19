# build environment
FROM node:15.5.1-alpine as build
ARG DB_HOST
ARG LOCATION_ELEVATION
ARG LOCATION_LATITUDE
ARG LOCATION_LONGITUDE
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production
ENV REACT_APP_INFLUX_DB_HOST=$DB_HOST
ENV REACT_APP_LOCATION_ELEVATION=$LOCATION_ELEVATION
ENV REACT_APP_LOCATION_LATITUDE=$LOCATION_LATITUDE
ENV REACT_APP_LOCATION_LONGITUDE=$LOCATION_LONGITUDE
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@4.0.1 -g --silent
COPY . ./
RUN npm run build
RUN chmod -R o+rx /app/build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
