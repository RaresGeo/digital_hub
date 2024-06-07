FROM golang:1.22.4-alpine as builder
ARG PORT=8080
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN swag init -g ./cmd/server/main.go
RUN go build -o ./main ./cmd/server/main.go

FROM alpine:latest as runner
WORKDIR /root/
COPY --from=builder /app/.env.production ./.env
COPY --from=builder /app/main .
EXPOSE ${PORT}
CMD ["./main"]
