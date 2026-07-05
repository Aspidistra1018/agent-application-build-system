package impl

import (
	"os"
	"strings"

	"github.com/coze-dev/coze-studio/backend/api/model/admin/config"
	"github.com/coze-dev/coze-studio/backend/infra/coderunner"
	"github.com/coze-dev/coze-studio/backend/infra/coderunner/impl/direct"
	"github.com/coze-dev/coze-studio/backend/infra/coderunner/impl/sandbox"
)

type Runner = coderunner.Runner

func New(conf *config.BasicConfiguration) Runner {
	switch conf.CodeRunnerType {
	case config.CodeRunnerType_Sandbox:
		getAndSplit := func(key string) []string {
			v := os.Getenv(key)
			if v == "" {
				return nil
			}
			return strings.Split(v, ",")
		}
		config := &sandbox.Config{
			AllowEnv:       getAndSplit(conf.SandboxConfig.AllowEnv),
			AllowRead:      getAndSplit(conf.SandboxConfig.AllowRead),
			AllowWrite:     getAndSplit(conf.SandboxConfig.AllowWrite),
			AllowNet:       getAndSplit(conf.SandboxConfig.AllowNet),
			AllowRun:       getAndSplit(conf.SandboxConfig.AllowRun),
			AllowFFI:       getAndSplit(conf.SandboxConfig.AllowFfi),
			NodeModulesDir: conf.SandboxConfig.NodeModulesDir,
			TimeoutSeconds: conf.SandboxConfig.TimeoutSeconds,
			MemoryLimitMB:  conf.SandboxConfig.MemoryLimitMb,
		}

		return sandbox.NewRunner(config)
	default:
		return direct.NewRunner()
	}
}
