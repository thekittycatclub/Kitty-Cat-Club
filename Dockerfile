FROM node:19-bullseye
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
EXPOSE 3000
COPY . .
CMD [ "npm", "start" ]