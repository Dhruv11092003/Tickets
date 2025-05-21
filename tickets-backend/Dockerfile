# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies inside the container
RUN npm install

# Copy source code AFTER installing
COPY . .

# Start the app
CMD ["npm", "run","dev"] 
