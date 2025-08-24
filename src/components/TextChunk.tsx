const defaultGreeting = [
  'Hiya! I\'m Coren, but some call me "Kern".',
  "I'm a Software Developer from Denver, CO.",
  "Welcome to my personal website!",
  "Hint: type 'menu' & press Enter to see available commands",
];

interface TextChunkProps {
  chunks?: string[];
  delay?: number;
  resetKey?: string | number; // Add a reset key to force re-animation
}

export default function TextChunk({
  chunks = defaultGreeting,
  delay = 0.5,
  resetKey = "default", // Default to a stable key for consistent behavior
}: TextChunkProps) {
  return (
    <>
      {chunks.flatMap((chunk, chunkIdx) => (
        <span
          key={`chunk-${resetKey}-${chunkIdx}`}
          className="chunk"
          style={{
            animationDelay: `${delay + chunkIdx * 1.5}s`,
          }}
        >
          {chunk.split("").map((char, idx) => (
            <span
              key={`char-${resetKey}-${chunkIdx}-${idx}`}
              className="inline"
              style={{
                animationDelay: `${delay + chunkIdx + idx * 0.025}s`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}
