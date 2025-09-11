# Used for local manual test builds as well as Anchore scans in github workflow

######
## Stage 1: Build application with Go's build tools
######
FROM docker.io/library/golang:alpine AS build

COPY . /app
WORKDIR /app

ARG GOOS=linux
ENV GO111MODULE=on

# download dependencies
RUN go mod download

# Set build-time variables
RUN go version
RUN go test ./...

# build binaries
RUN go build -ldflags="-X main.buildTimestamp=$(date '+%Y%m%d%H%M%S')" -o risk_demo_rule cmd/risk_demo/main.go
RUN go build -ldflags="-X main.buildTimestamp=$(date '+%Y%m%d%H%M%S')" -o threagile cmd/threagile/main.go

# add the -race parameter to go build call in order to instrument with race condition detector: https://blog.golang.org/race-detector
# NOTE: copy files with final name to send to final build

# copy assets
RUN cp /app/demo/example/threagile.yaml /app/demo/example/threagile-example-model.yaml
RUN cp /app/demo/stub/threagile.yaml /app/demo/stub/threagile-stub-model.yaml


######
## Stage 2: Make final small image
######
#FROM alpine:edge AS finalize
FROM alpine:latest AS finalize

# label used in other scripts to filter
LABEL type="threagile"

# add certificates, graphviz, fonts
RUN apk add --update --no-cache ca-certificates
RUN apk add --update --no-cache graphviz ttf-freefont

# https://stackoverflow.com/questions/66963068/docker-alpine-executable-binary-not-found-even-if-in-path
RUN apk add libc6-compat

# https://stackoverflow.com/questions/34729748/installed-go-binary-not-found-in-path-on-alpine-linux-docker
# RUN mkdir -p /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

# clean apk cache
RUN rm -rf /var/cache/apk/*

# add non-privileged user
WORKDIR /app
RUN adduser --disabled-password --gecos "" --home "$(pwd)" --no-create-home threagile

RUN mkdir -p /app /data
RUN chown -R threagile:threagile /app /data

USER threagile

COPY --from=build --chown=threagile:threagile /app/threagile /app/
COPY --from=build --chown=threagile:threagile /app/risk_demo_rule /app/
COPY --from=build --chown=threagile:threagile /app/LICENSE.txt /app/
COPY --from=build --chown=threagile:threagile /app/report/template/background.pdf /app/
COPY --from=build --chown=threagile:threagile /app/report/threagile-logo.png /app/
COPY --from=build --chown=threagile:threagile /app/support/openapi.yaml /app/
COPY --from=build --chown=threagile:threagile /app/support/schema.json /app/
COPY --from=build --chown=threagile:threagile /app/support/live-templates.txt /app/
COPY --from=build --chown=threagile:threagile /app/demo/example/threagile-example-model.yaml /app/
COPY --from=build --chown=threagile:threagile /app/demo/stub/threagile-stub-model.yaml /app/
COPY --from=build --chown=threagile:threagile /app/server /app/server

ENV PATH=/app:$PATH
ENV GIN_MODE=release

ENTRYPOINT ["/app/threagile"]
CMD ["help"]
