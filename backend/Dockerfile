FROM node:23

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5205

CMD ["npm", "start"]


# docker build -t my-node-app .
# docker run -it --rm --name my-node-app -p 5205:5205 my-node-app
# docker build -t my-node-app . && docker run -it --rm --name my-node-app -p 5205:5205 my-node-app



