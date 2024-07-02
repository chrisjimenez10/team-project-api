#Here we are using the official Node.js image as the base image using the FROM directive
FROM node:22-alpine3.19

#NOTE: Ensure that after the initial directive, we MOVE into the working directory where we will run all of the subsequent commands --> This represents the working directory in the virtual filesystem of the Docker Container
WORKDIR /usr/src/app

#The first file "pacakge.json" corresponds to the file/file-path INSIDE the local machine and the second argument "./" corresponds to WHERE we are copying the file inside the Virtual Filesystem of the Docker Container
COPY package.json ./

#Installs all dependencies listed in pacakge.json
RUN npm install

#Copy ALL remaining files and directories from the local machine to the virutal filesystem --> NOTE: The file path to the virtual filesystem on the Docker Container is "." which means current working directory because we ALREADY moved into the working directory, so we are currently there ("/usr/src/app")
COPY . .

#We are exposing the port the app runs on (This refers to the port we assigned in our code located in server.js file)
EXPOSE 5000

#This is the command to run the application
CMD ["node", "server.js"]

