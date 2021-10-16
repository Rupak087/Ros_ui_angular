#stage1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run ng -- build --prod

#stage 2
FROM nginx:1.20.0-alpine
COPY --from=node /app/dist/ROS-UI-WEB /usr/share/nginx/html
#COPY /app/dist/ROS-UI-WEB /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Expose ports
EXPOSE 80

# Set the default command to execute

CMD [ "nginx","-g","daemon off;" ]