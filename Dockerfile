# Build from node.js-alpine BaseImage
FROM node:10-alpine

# Install git as a prereq
RUN apk add --no-cache git

# create working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install & Link Dependencies
COPY package*.json /usr/src/app/

# Install node_modules
RUN npm install

# Now copy our Source Files for building
COPY . /usr/src/app

# Build the app inside Docker WORKDIR
RUN npm run build

# For development
#EXPOSE 3000:3000

# Tell docker how to start the app
CMD npm start