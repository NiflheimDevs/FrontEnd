# Use official Node.js image
FROM node:23-alpine

# Install required dependencies for TailwindCSS
RUN apk update && apk add --no-cache build-base python3

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm uninstall tailwindcss --legacy-peer-deps && \
    rm -rf node_modules package-lock.json && \
    npm install --legacy-peer-deps

# Copy the rest of the project files
COPY . .

# Build the Next.js application
RUN npm run build

# Start the Next.js app
CMD ["npm", "run", "start"]