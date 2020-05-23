FROM node:12-slim
WORKDIR /app
COPY package*.json /app/
COPY tsconfig.json /app/
COPY .mocharc.json /app/
COPY .prettierrc.js /app/
COPY server /app/server
COPY test /app/test
COPY public /app/public
RUN npm install
RUN npm run compile
CMD ["npm", "run", "start:server"]