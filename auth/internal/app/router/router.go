package router

import (
	"auth/internal/app/authenticate"
	"auth/internal/app/healthcheck"
	"auth/internal/domain/repository"
	"auth/internal/domain/service"
	"auth/internal/infrastructure/google"
	"auth/internal/usecase"

	"github.com/gin-gonic/gin"
)

// NewRouter creates and configures a Gin engine.
func NewRouter(
	userRepository repository.UserRepository,
	googleService google.OAuthService,
) *gin.Engine {
	router := gin.Default()

	// Middlewares
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	userAuthenticator := service.NewUserAuthenticator(userRepository)
	userAuthUseCase := usecase.NewUserAuthUseCase(*userAuthenticator, googleService)

	// Routes
	registerAPIRoutes(router, userAuthUseCase)

	return router
}

// registerAPIRoutes sets up all the routes for the application.
func registerAPIRoutes(router *gin.Engine, service *usecase.UserAuthUseCase) {
	// Example endpoint
	router.GET("/", healthcheck.Handler())
	router.GET("/authenticate/:token", authenticate.Handler(service))
}
