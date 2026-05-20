FROM node:24.16.0-alpine AS base
WORKDIR /workspace
ENV APP_NAME=backend
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
COPY --chown=${USER}:${GROUPNAME} package.json package-lock.json .npmrc ./
# install production node modules
RUN NODE_ENV=production npm ci --workspace="$APP_NAME" --workspace=shared --omit=dev &&\
  mv ./node_modules /prod_node_modules
# install ALL node modules, including 'devDependencies'
RUN npm ci --workspace="$APP_NAME" --workspace=shared
RUN npm run --workspace="$APP_NAME" test &&\
  npm run --workspace="$APP_NAME" tsc-prod

##### Production
FROM base AS production
COPY --chown=${USER}:${GROUPNAME} --from=ci /prod_node_modules ./
COPY --chown=${USER}:${GROUPNAME} --from=ci "/workspace/$APP_NAME/dist/" ./
WORKDIR "/workspace/$APP_NAME"
USER "$USER:$GROUPNAME"
CMD ["node", "src/main.js"]

##### Development
FROM ci AS development
WORKDIR "/workspace/$APP_NAME"
CMD ["./bin/dev"]

