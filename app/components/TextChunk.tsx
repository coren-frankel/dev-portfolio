interface TextChunkProps {
  chunks: string[];
  delay?: number;
  resetKey?: string | number; // Add a reset key to force re-animation
  startImmediately?: boolean; // New prop to control if chunks should start immediately
  baseDelay?: number; // Base delay for when startImmediately is true
}

export default function TextChunk({
  chunks,
  delay = 0.5,
  resetKey = "default", // Default to a stable key for consistent behavior
  startImmediately = false, // Default to false for backwards compatibility
  baseDelay = 0, // Base delay for immediate chunks
}: TextChunkProps) {
  return (
    <>
      {chunks.flatMap((chunk, chunkIdx) => {
        // Calculate delay based on cumulative length of previous chunks in this render
        let cumulativeDelay = baseDelay;
        if (startImmediately && chunkIdx > 0) {
          for (let i = 0; i < chunkIdx; i++) {
            cumulativeDelay += chunks[i].length * 0.025; // Time for previous chunk to complete
          }
        }

        const chunkDelay = startImmediately
          ? cumulativeDelay
          : delay + chunkIdx * 1.5;

        return (
          <span
            key={`chunk-${resetKey}-${chunkIdx}`}
            className="chunk"
            style={{
              animationDelay: `${chunkDelay}s`,
            }}
          >
            {chunk.split("").map((char, idx) => (
              <span
                key={`char-${resetKey}-${chunkIdx}-${idx}`}
                className="inline"
                style={{
                  animationDelay: `${chunkDelay + idx * 0.025}s`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}
