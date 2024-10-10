import process from 'process';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { HostMetrics } from '@opentelemetry/host-metrics';
import { metrics } from '@opentelemetry/api';
import { RuntimeNodeInstrumentation } from '@opentelemetry/instrumentation-runtime-node';

const prometheusExporter = new PrometheusExporter();

const sdk = new NodeSDK({
  metricReader: prometheusExporter,
  instrumentations: [
    getNodeAutoInstrumentations(),
    new RuntimeNodeInstrumentation({
      eventLoopUtilizationMeasurementInterval: 5000,
    }),
  ],
});

sdk.start();

const hostMetrics = new HostMetrics({
  meterProvider: metrics.getMeterProvider(),
});
hostMetrics.start();

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err)
    )
    .finally(() => process.exit(0));
});
