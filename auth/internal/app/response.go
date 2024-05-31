package app

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type BaseResponse struct {
	OK bool `json:"ok"`
}

type BaseErrorResponse struct {
	BaseResponse
	Error string `json:"error"`
}

func RespondError(c *gin.Context, status int, err error) {
	c.AbortWithStatusJSON(status, BaseErrorResponse{
		BaseResponse: BaseResponse{OK: false},
		Error:        fmt.Sprintf("%v", err),
	})
}
