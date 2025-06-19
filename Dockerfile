# Use official Node.js LTS image
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy app source
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
