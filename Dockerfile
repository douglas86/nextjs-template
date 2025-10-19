FROM node:24.10.0-alpine3.22

#using globally package store on local computer
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

ENV PNPM_STORE_DIR=/pnpm/store


#install neccary packages and use pnpm version from engines object in package.json
RUN apk update && \
    apk add --no-cache jq openssl && \
    rm -rf /var/cache/apk/*

COPY package.json pnpm-lock.yaml ./


# Use corepack (built into modern Node images) to enable pnpm
# and install the specific version required by the 'engines' field.
RUN corepack enable && \
    pnpm_VERSION=$(jq -r '.engines.pnpm' package.json) && \
    if [ -z "$pnpm_VERSION" ] || [ "$pnpm_VERSION" = "null" ]; then \
        echo "Warning: 'engines.pnpm' not found or empty. Falling back to latest pnpm version." && \
        corepack prepare pnpm@latest --activate; \
    else \
        echo "Detected pnpm version: $pnpm_VERSION. Installing specific version." && \
        corepack prepare pnpm@$pnpm_VERSION --activate; \
    fi

RUN --mount=type=cache,id=pnpm,target=${PNPM_STORE_DIR} \
    pnpm install --frozen-lockfile --prefer-offline

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
