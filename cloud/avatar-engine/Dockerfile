# Using Node 20 Slim as the base image (Debian-based)
FROM node:20-slim

# Install OpenSSL 3.x and other necessary system libraries for Prisma/GCP
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Create and set the working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies like 'prisma' for generation)
RUN npm install

# Generate Prisma Client (uses the debian-openssl-3.0.x binary target)
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Cloud Run sets the PORT environment variable.
# Standard is 8080, but we respect the env var.
ENV PORT 8080

# Start the server
CMD ["npm", "start"]
