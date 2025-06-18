# Use a Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Build TypeScript (if needed)
RUN npm run build

# Command to run the bot
CMD ["npm", "start"]
