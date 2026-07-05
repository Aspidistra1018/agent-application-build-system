package config

type WorkflowConfig struct {
	NodeOfCodeConfig *NodeOfCodeConfig `yaml:"NodeOfCodeConfig"`
}

func (w *WorkflowConfig) GetNodeOfCodeConfig() *NodeOfCodeConfig {
	return w.NodeOfCodeConfig
}

type NodeOfCodeConfig struct {
	SupportThirdPartModules []string `yaml:"SupportThirdPartModules"`
}

func (n *NodeOfCodeConfig) GetSupportThirdPartModules() []string {
	return n.SupportThirdPartModules
}
