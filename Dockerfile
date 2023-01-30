ARG ARCH=
FROM node:lts-alpine AS build
WORKDIR /opt/ng
COPY package.json yarn.lock ./
RUN yarn
RUN npx ngcc
WORKDIR /opt/ng
COPY . ./
RUN yarn build:prod

FROM ${ARCH}nginx:1.21-alpine AS runtime
COPY --from=build /opt/ng/dist/houseapp /usr/share/nginx/html
COPY --from=build /opt/ng/nginx.conf /etc/nginx/nginx.conf
