# Docker Deployment Guide

## Files Overview

### 1. `Dockerfile`
Multi-stage production-ready Docker image:
- **Stage 1 (builder)**: Installs production dependencies
- **Stage 2 (production)**: Minimal runtime image
- Uses Node.js 20 Alpine (lightweight)
- Runs as non-root user for security
- Includes health check endpoint
- Optimized for production

### 2. `.dockerignore`
Excludes unnecessary files from Docker build:
- node_modules (reinstalled in container)
- Environment files (.env)
- Git files
- Documentation
- IDE configs
- Logs and test files

### 3. `docker-compose.yml`
Easy orchestration for development/production:
- Automatic environment variable loading
- Health checks
- Network isolation
- Port mapping
- Restart policies

---

## Quick Start

### Option 1: Docker Build & Run

```bash
# Build the image
docker build -t cyber-ai-backend .

# Run the container
docker run -d \
  --name cyber-ai-backend \
  -p 3000:3000 \
  --env-file .env \
  cyber-ai-backend
```

### Option 2: Docker Compose (Recommended)

```bash
# Start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

---

## Environment Variables

Ensure your `.env` file contains all required variables:

```env
# Required
PORT=3000
JWT_SECRET=your_jwt_secret
Mongodb_url=your_mongodb_url
GEMINI_API_KEY=your_gemini_key
PINECONE_API=your_pinecone_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private
IMAGEKIT_PUBLIC_KEY=your_imagekit_public
IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_ALT=http://localhost:5174
PRODUCTION_URL=https://your-production-url.vercel.app
```

**Note**: Never commit `.env` to version control!

---

## Docker Commands

### Build
```bash
# Build image
docker build -t cyber-ai-backend .

# Build with no cache
docker build --no-cache -t cyber-ai-backend .
```

### Run
```bash
# Run in detached mode
docker run -d --name cyber-ai-backend -p 3000:3000 --env-file .env cyber-ai-backend

# Run with logs
docker run --name cyber-ai-backend -p 3000:3000 --env-file .env cyber-ai-backend

# Run with custom port
docker run -d --name cyber-ai-backend -p 8080:3000 --env-file .env cyber-ai-backend
```

### Manage
```bash
# View logs
docker logs -f cyber-ai-backend

# Stop container
docker stop cyber-ai-backend

# Start container
docker start cyber-ai-backend

# Restart container
docker restart cyber-ai-backend

# Remove container
docker rm cyber-ai-backend

# Remove image
docker rmi cyber-ai-backend
```

### Debug
```bash
# Execute shell in running container
docker exec -it cyber-ai-backend sh

# Check health status
docker inspect --format='{{.State.Health.Status}}' cyber-ai-backend

# View container stats
docker stats cyber-ai-backend
```

---

## Docker Compose Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# View running containers
docker-compose ps

# Remove volumes (careful!)
docker-compose down -v
```

---

## Health Check

The container includes a health check endpoint:

**Endpoint**: `GET /api/health`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-15T10:00:00.000Z",
  "uptime": 123.456
}
```

**Docker Health Check**:
```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' cyber-ai-backend

# View health logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' cyber-ai-backend
```

---

## Production Deployment

### 1. Using Docker

```bash
# Build production image
docker build -t cyber-ai-backend:latest .

# Push to registry (e.g., Docker Hub)
docker tag cyber-ai-backend:latest your-username/cyber-ai-backend:latest
docker push your-username/cyber-ai-backend:latest

# On production server
docker pull your-username/cyber-ai-backend:latest
docker run -d \
  --name cyber-ai-backend \
  -p 3000:3000 \
  --restart unless-stopped \
  --env-file .env \
  your-username/cyber-ai-backend:latest
```

### 2. Using Docker Compose

```bash
# On production server
docker-compose -f docker-compose.yml up -d

# Update deployment
docker-compose pull
docker-compose up -d --force-recreate
```

---

## Security Best Practices

✅ **Non-root user**: Container runs as `nodejs` user (UID 1001)
✅ **Minimal image**: Uses Alpine Linux (small attack surface)
✅ **No secrets in image**: All credentials via environment variables
✅ **Health checks**: Automatic container health monitoring
✅ **Multi-stage build**: Smaller final image size
✅ **.dockerignore**: Prevents sensitive files in image

---

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs cyber-ai-backend

# Check if port is already in use
lsof -i :3000
```

### Environment variables not loading
```bash
# Verify .env file exists
ls -la .env

# Check container environment
docker exec cyber-ai-backend env
```

### Health check failing
```bash
# Test health endpoint manually
docker exec cyber-ai-backend wget -q -O- http://localhost:3000/api/health

# Check if app is listening
docker exec cyber-ai-backend netstat -tlnp
```

### Permission errors
```bash
# Ensure files are readable
chmod -R 755 src public
chmod 644 package*.json server.js
```

---

## Image Size Optimization

Current optimizations:
- Multi-stage build
- Alpine Linux base
- Production dependencies only
- Proper .dockerignore

**Check image size**:
```bash
docker images cyber-ai-backend
```

**Typical size**: ~200-300MB (Alpine + Node 20 + dependencies)

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t cyber-ai-backend .
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push cyber-ai-backend:latest
```

---

## Monitoring

### Container Metrics
```bash
# Real-time stats
docker stats cyber-ai-backend

# Resource usage
docker inspect cyber-ai-backend | grep -A 10 Memory
```

### Application Logs
```bash
# Follow logs
docker logs -f cyber-ai-backend

# Last 100 lines
docker logs --tail 100 cyber-ai-backend

# Logs from last hour
docker logs --since 1h cyber-ai-backend
```

---

## Next Steps

1. ✅ Test locally: `docker-compose up`
2. ✅ Verify health check: `curl http://localhost:3000/api/health`
3. ✅ Test API endpoints
4. ✅ Push to registry
5. ✅ Deploy to production
6. ✅ Set up monitoring

---

## Support

For issues:
1. Check logs: `docker logs cyber-ai-backend`
2. Verify environment variables
3. Test health endpoint
4. Check network connectivity
5. Review Docker documentation
# Using Docker Compose (easiest)
cd Backend
docker-compose up -d

# Or using Docker directly
docker build -t cyber-ai-backend .
docker run -d --name cyber-ai-backend -p 3000:3000 --env-file .env cyber-ai-backend