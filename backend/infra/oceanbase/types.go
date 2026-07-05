package oceanbase

type VectorIndexConfig struct {
	Distance string
	//Index types: hnsw, hnsw_sq, hnsw_bq, ivf_flat, ivf_sq8, ivf_pq
	Type string
	//Index library type: vsag, ob
	Lib string
	// HNSW Index parameters
	M              *int
	EfConstruction *int
	EfSearch       *int
	// IVF Index parameters
	Nlist *int
	Nbits *int
	IVFM  *int
}

type VectorData struct {
	ID             int64                  `json:"id"`
	CollectionName string                 `json:"collection_name"`
	VectorID       string                 `json:"vector_id"`
	Content        string                 `json:"content"`
	Metadata       map[string]interface{} `json:"metadata"`
	Embedding      []float64              `json:"embedding"`
}

type VectorSearchResult struct {
	ID       int64   `json:"id"`
	Content  string  `json:"content"`
	Metadata string  `json:"metadata"`
	Distance float64 `json:"distance"`
}

type VectorMemoryEstimate struct {
	MinMemoryMB         int `json:"min_memory_mb"`
	RecommendedMemoryMB int `json:"recommended_memory_mb"`
	EstimatedMemoryMB   int `json:"estimated_memory_mb"`
}

const (
	VectorIndexTypeHNSW   = "hnsw"
	VectorIndexTypeHNSWSQ = "hnsw_sq"
	VectorIndexTypeHNSWBQ = "hnsw_bq"
	VectorIndexTypeIVF    = "ivf_flat"
	VectorIndexTypeIVFSQ  = "ivf_sq8"
	VectorIndexTypeIVFPQ  = "ivf_pq"
)

const (
	VectorDistanceTypeL2           = "l2"
	VectorDistanceTypeCosine       = "cosine"
	VectorDistanceTypeInnerProduct = "inner_product"
)

const (
	VectorLibTypeVSAG = "vsag"
	VectorLibTypeOB   = "ob"
)

func DefaultVectorIndexConfig() *VectorIndexConfig {
	m := 16
	efConstruction := 200
	efSearch := 64

	return &VectorIndexConfig{
		Distance:       VectorDistanceTypeCosine,
		Type:           VectorIndexTypeHNSW,
		Lib:            VectorLibTypeVSAG,
		M:              &m,
		EfConstruction: &efConstruction,
		EfSearch:       &efSearch,
	}
}

func HNSWVectorIndexConfig(distance string, m, efConstruction, efSearch int) *VectorIndexConfig {
	return &VectorIndexConfig{
		Distance:       distance,
		Type:           VectorIndexTypeHNSW,
		Lib:            VectorLibTypeVSAG,
		M:              &m,
		EfConstruction: &efConstruction,
		EfSearch:       &efSearch,
	}
}

func IVFVectorIndexConfig(distance string, nlist, nbits, m int) *VectorIndexConfig {
	return &VectorIndexConfig{
		Distance: distance,
		Type:     VectorIndexTypeIVF,
		Lib:      VectorLibTypeOB,
		Nlist:    &nlist,
		Nbits:    &nbits,
		IVFM:     &m,
	}
}
