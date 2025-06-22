# 1. Base Image
FROM node:18-alpine AS base

# 2. Set working directory
WORKDIR /app

# 3. Install pnpm
RUN npm install -g pnpm

# 4. Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 5. Install dependencies
RUN pnpm install

# 6. Copy the rest of the application
COPY . .

# 7. Build the Next.js application
RUN pnpm build

# 8. Set the PORT environment variable
ENV PORT=3000

# 9. Expose the port
EXPOSE 3000

# 10. Command to run the application
CMD ["pnpm", "start"] 