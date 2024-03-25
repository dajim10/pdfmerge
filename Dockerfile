# Use Node.js LTS version as the base image
FROM node:18 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json  ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the React Vite project for production
RUN npm build

# Use nginx as the base image for serving the production build
FROM nginx:alpine

# Copy the built files from the builder stage to nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server when the container starts
CMD ["nginx", "-g", "daemon off;"]
