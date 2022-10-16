FROM node:16.17.1-alpine3.16 AS base
RUN apk upgrade --update-cache && \
    apk add openssl musl && \
    rm -rf /var/cache/apk/*
WORKDIR /app
ENV YARN_CACHE_FOLDER=.yarn-cache

# pruner
FROM base AS pruner
RUN yarn global add turbo@1.5.5
COPY . .
RUN turbo prune --scope="@d-debt/core" --docker
RUN yarn global remove turbo

# development dependencies
FROM base AS dev-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

# production dependencies
FROM base AS prod-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=dev-deps /app/${YARN_CACHE_FOLDER} /${YARN_CACHE_FOLDER}
RUN yarn install --frozen-lockfile --production --prefer-offline
RUN rm -rf /app/${YARN_CACHE_FOLDER}

# build
FROM base AS builder
COPY --from=dev-deps /app/ .
COPY --from=pruner /app/out/full/ .
RUN yarn generate
RUN yarn turbo run build --scope="@d-debt/core" --include-dependencies --no-deps
RUN find . -name node_modules | xargs rm -rf

# reduce size for production
FROM base AS cleaner
RUN yarn global add modclean
COPY --from=prod-deps /app/ .
COPY --from=builder /app/ .
RUN yarn generate
RUN modclean --run
RUN yarn global remove modclean

FROM base AS runner
COPY --from=cleaner /app/ .
WORKDIR /app/services/core
USER node
CMD node dist/main
