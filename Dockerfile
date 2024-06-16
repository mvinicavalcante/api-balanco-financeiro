# Node version
FROM node:18-alpine

WORKDIR /usr/src/api-balanco-financeiro

COPY package*.json ./

# Copy and Paste (dict workdir)
RUN npm install --quiet --no-optional --no-found --loglevel=error

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3000