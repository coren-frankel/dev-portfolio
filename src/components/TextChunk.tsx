const defaultGreeting = [
  'Hiya! I\'m Coren, but some call me "Kern".',
  "I'm a Software Developer from Denver, CO.",
  "Welcome to my personal website!",
  "Hint: type 'menu' & press Enter to see available commands",
];

interface TextChunkProps {
  chunks?: string[];
  delay?: number;
}

export default function TextChunk({
  chunks = defaultGreeting,
  delay = 1,
}: TextChunkProps) {
  return (
    <>
      {chunks.flatMap((chunk, chunkIdx) => (
        <span
          key={`chunk-${delay === 1 ? "pri" : "com"}-${chunkIdx}`}
          className="chunk"
          style={{
            animationDelay: `${delay + chunkIdx * 1.5}s`,
          }}
        >
          {chunk.split("").map((char, idx) => (
            <span
              key={`${delay === 1 ? "pri" : "com"}-${(idx + 1) * (chunkIdx + 1)}`}
              className="inline"
              style={{
                animationDelay: `${delay + chunkIdx * 0.5 + idx * 0.025}s`,
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
