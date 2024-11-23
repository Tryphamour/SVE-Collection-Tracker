FROM node:22.11-slim AS base
ARG PNPM_VERSION=9.14.2
RUN npm --global install pnpm@${PNPM_VERSION}

FROM base AS install
ARG APP
WORKDIR /SVE
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.json ./
COPY apps/tsconfig.json ./apps/
# COPY packages/tsconfig.json ./packages/
COPY $APP ./$APP
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM install AS dev
ARG APP
WORKDIR /SVE/${APP}
USER node
ENTRYPOINT ["/usr/local/bin/pnpm"]
CMD ["run", "dev"]
