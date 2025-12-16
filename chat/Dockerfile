    # ----------- Build Stage -----------
    FROM node:22-alpine AS build

    WORKDIR /app

    # install deps
    COPY package*.json ./
    RUN npm install --legacy-peer-deps

    # copy source
    COPY . .

    # build react app
    ARG REACT_APP_API_BASE_URL
    ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

    RUN npm run build
     EXPOSE 5173

CMD ["npm", "run", "dev"]

