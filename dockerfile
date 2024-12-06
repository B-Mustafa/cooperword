# Use the official Node.js 18 image as the base
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lightweight Node.js image for production
FROM node:18-alpine AS runner

# Set the working directory inside the container
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Install production dependencies only
RUN npm install --production

# Expose the port your app runs on
EXPOSE 3000

# Set the command to start the application
CMD ["npm", "start"]
