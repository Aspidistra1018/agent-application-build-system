package execute

import (
	"errors"
	"io"
	"sync"

	"github.com/cloudwego/eino/schema"

	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity"
)

type StreamContainer struct {
	sw         *schema.StreamWriter[*entity.Message]
	subStreams chan *schema.StreamReader[*entity.Message]
	wg         sync.WaitGroup
}

func NewStreamContainer(sw *schema.StreamWriter[*entity.Message]) *StreamContainer {
	return &StreamContainer{
		sw:         sw,
		subStreams: make(chan *schema.StreamReader[*entity.Message]),
	}
}

func (sc *StreamContainer) AddChild(sr *schema.StreamReader[*entity.Message]) {
	sc.wg.Add(1)
	sc.subStreams <- sr
}

func (sc *StreamContainer) PipeAll() {
	sc.wg.Add(1)

	for sr := range sc.subStreams {
		go func() {
			defer sr.Close()

			for {
				msg, err := sr.Recv()
				if err != nil {
					if errors.Is(err, io.EOF) {
						sc.wg.Done()
						return
					}
				}

				sc.sw.Send(msg, err)
			}
		}()
	}
}

func (sc *StreamContainer) Done() {
	sc.wg.Done()
	sc.wg.Wait()
	close(sc.subStreams)
	sc.sw.Close()
}
