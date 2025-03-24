FROM node:23

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5067

CMD ["npm", "start"]


# docker build -t my-node-app .
# docker run -it --rm --name my-node-app -p 5067:5067 my-node-app
# docker build -t my-node-app . && docker run -it --rm --name my-node-app -p 5067:5067 my-node-app



