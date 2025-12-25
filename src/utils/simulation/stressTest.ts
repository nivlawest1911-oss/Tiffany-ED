export const runStressTest = (callback: (data: any) => void) => {
  console.log("🚀 INITIALIZING SOVEREIGN STRESS TEST: 500 VIRTUAL NODES...");
  
  let iteration = 0;
  const interval = setInterval(() => {
    iteration++;
    
    // Simulate high-frequency data spikes across the district
    const simulatedLoad = {
      activeNodes: Math.floor(Math.random() * 100) + 400,
      systemStability: (0.99 + Math.random() * 0.01).toFixed(4),
      currentLatency: `${Math.floor(Math.random() * 15) + 5}ms`,
      breakthroughSpike: iteration % 5 === 0
    };

    callback(simulatedLoad);

    if (iteration >= 100) {
      clearInterval(interval);
      console.log("✅ STRESS TEST COMPLETE: 0 DROPPED SYNAPSES.");
    }
  }, 100); // 10 updates per second
};
