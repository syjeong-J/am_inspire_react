# dev
FROM node:latest as build

WORKDIR /front

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

# run stage
FROM nginx:latest

COPY --from=build /front/build usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]