package vo

type ReleaseWorkflowConfig struct {
	Version   string
	PluginIDs []int64

	ConnectorIDs []int64
	WorkflowIDs  []int64
}
