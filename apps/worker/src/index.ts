import { processOutboxBatch } from './processor';

export async function runWorker() {
  const workerId = `worker-${process.pid}-${Date.now().toString(36)}`;
  return processOutboxBatch({
    workerId,
    batchSize: 15,
    maxExecutionTimeMs: 10000, // 10 seconds execution limit
  });
}

if (process.env.NODE_ENV !== 'test' && require.main === module) {
  runWorker()
    .then((res) => {
      console.log('Worker cycle completed:', res);
      process.exit(0);
    })
    .catch((err) => {
      console.error('Worker failed:', err);
      process.exit(1);
    });
}
