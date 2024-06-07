package main

import (
	"auth/internal/app/router"
	"auth/internal/infrastructure/google"
	"auth/internal/persistence/postgres"
	"context"
	"log"
	"os"

	_ "auth/docs"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

// @title Authentication REST API
// @version 1.0
// @description This auth API only functions with OAuth2 and it shares the same database with [...]
// @host localhost:8080

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
		panic(err)
	}

	// set up the database connection
	pool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
		panic(err)
	}

	userRepository := postgres.NewUserRepository(pool)
	googleService := google.NewGoogleService(
		os.Getenv("GOOGLE_CLIENT_ID"),
		os.Getenv("GOOGLE_CLIENT_SECRET"),
		os.Getenv("GOOGLE_REDIRECT_URL"),
	)

	r := router.NewRouter(userRepository, googleService)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}
	r.Run("0.0.0.0:" + port)
}
