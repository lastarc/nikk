FROM alpine:latest

ARG PB_VERSION=0.22.14
ARG TARGETARCH

RUN apk add --no-cache \
    unzip \
    ca-certificates

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${TARGETARCH}.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY ./pb_migrations /pb/pb_migrations

EXPOSE 8090

CMD ["/pb/pocketbase", "--dir", "pb_data", "serve", "--http=0.0.0.0:8090"]
