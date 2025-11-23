# Use Node.js Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .



# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000


# Start the application
CMD ["npm", "start"]