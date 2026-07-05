package pulsar

import (
	"context"
	"os"
	"sync"
	"testing"
	"time"

	"github.com/apache/pulsar-client-go/pulsar"
	"github.com/stretchr/testify/assert"

	"github.com/coze-dev/coze-studio/backend/types/consts"
)

var serviceURL = "pulsar://localhost:6650"

func TestProducer(t *testing.T) {
	if os.Getenv("PULSAR_LOCAL_TEST") != "true" {
		return
	}

	// JWT token should be set via environment variable PULSAR_JWT_TOKEN if needed
	// For local testing, you can set: export PULSAR_JWT_TOKEN="your-jwt-token"

	clientOptions := pulsar.ClientOptions{
		URL: serviceURL,
	}
	if jwtToken := os.Getenv(consts.PulsarJWTToken); jwtToken != "" {
		clientOptions.Authentication = pulsar.NewAuthenticationToken(jwtToken)
	}

	client, err := pulsar.NewClient(clientOptions)
	assert.NoError(t, err)
	defer client.Close()

	producer, err := client.CreateProducer(pulsar.ProducerOptions{
		Topic: "test_topic",
		Name:  "test_group_producer",
	})
	assert.NoError(t, err)
	defer producer.Close()

	msgID, err := producer.Send(context.Background(), &pulsar.ProducerMessage{
		Payload: []byte("hello"),
	})
	assert.NoError(t, err)
	t.Logf("Message sent with ID: %v", msgID)
}

func TestConsumer(t *testing.T) {
	if os.Getenv("PULSAR_LOCAL_TEST") != "true" {
		return
	}

	// JWT token should be set via environment variable PULSAR_JWT_TOKEN if needed
	// For local testing, you can set: export PULSAR_JWT_TOKEN="your-jwt-token"

	clientOptions := pulsar.ClientOptions{
		URL: serviceURL,
	}
	if jwtToken := os.Getenv(consts.PulsarJWTToken); jwtToken != "" {
		clientOptions.Authentication = pulsar.NewAuthenticationToken(jwtToken)
	}

	client, err := pulsar.NewClient(clientOptions)
	assert.NoError(t, err)
	defer client.Close()

	// First create consumer
	consumer, err := client.Subscribe(pulsar.ConsumerOptions{
		Topic:            "test_topic",
		SubscriptionName: "test_group_consumer",
		Type:             pulsar.Shared,
	})
	assert.NoError(t, err)
	defer consumer.Close()

	// Then create producer and send a message
	producer, err := client.CreateProducer(pulsar.ProducerOptions{
		Topic: "test_topic",
		Name:  "test_consumer_producer",
	})
	assert.NoError(t, err)
	defer producer.Close()

	// Send a test message
	_, err = producer.Send(context.Background(), &pulsar.ProducerMessage{
		Payload: []byte("consumer test message"),
	})
	assert.NoError(t, err)

	wg := sync.WaitGroup{}
	wg.Add(1)

	go func() {
		defer wg.Done()
		msg, err := consumer.Receive(context.Background())
		if err != nil {
			t.Errorf("Failed to receive message: %v", err)
			return
		}
		t.Logf("Received message: %s", string(msg.Payload()))
		consumer.Ack(msg)
	}()

	wg.Wait()
	time.Sleep(time.Second)
}
