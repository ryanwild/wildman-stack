FROM node:24.16.0-alpine AS base
WORKDIR /workspace
ENV PORT=80
ENV HOST="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1
ENV APP_NAME=userui
ENV USER=app
ENV GROUPNAME=$USER
ENV UID=1001
ENV GID=2002
RUN addgroup --system --gid "$GID" "$GROUPNAME" && \
  adduser --system --disabled-password --gecos "" --home "$(pwd)" --ingroup "$GROUPNAME" --no-create-home --uid "$UID" "$USER"
RUN npm install -g npm@11.15.0
HEALTHCHECK --interval=30s --timeout=30s --start-period=90s --retries=3 \
  CMD wget --no-verbose --tries=1 -qO- http://0.0.0.0/health || exit 1

##### CI
FROM base AS ci
COPY --chown=${USER}:${GROUPNAME} "./$APP_NAME" "./$APP_NAME"
COPY --chown=${USER}:${GROUPNAME} ./shared ./shared
COPY --chown=${USER}:${GROUPNAME} package.json package-lock.json .npmrc .env ./
# install production node modules
RUN NODE_ENV=production npm ci --workspace="$APP_NAME" --workspace=shared --omit=dev &&\
  mv ./node_modules /prod_node_modules
# install ALL node modules, including 'devDependencies'
RUN npm ci --workspace="$APP_NAME" --workspace=shared &&\
  npm run --workspace="$APP_NAME" build

##### Production
FROM ci AS production
COPY --chown=${USER}:${GROUPNAME} --from=ci "/workspace/$APP_NAME/" ./
COPY --chown=${USER}:${GROUPNAME} --from=ci /prod_node_modules ./
WORKDIR "/workspace/$APP_NAME"
USER "$USER:$GROUPNAME"
CMD ["npm","run", "start"]

##### Development
FROM ci AS development
ENV NODE_ENV=development
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
# ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/
# COPY ./cert/root.crt /usr/local/share/ca-certificates/dev.crt
# USER root
# RUN cat /usr/local/share/ca-certificates/dev.crt >> /etc/ssl/certs/ca-certificates.crt
WORKDIR "/workspace/$APP_NAME"
CMD ["npm","run", "dev"]

