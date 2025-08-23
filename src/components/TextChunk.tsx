const textChunks = [
  'Hiya! I\'m Coren, but some call me "Kern".',
  "I'm a Software Developer from Denver, CO.",
  "Welcome to my personal website!",
  "Here's how to navigate:",
  "Type 'home' to go to the home page",
  "Type 'about' to learn more about me",
  "Type 'contact' to reach out",
  "Press the Enter key to execute a command",
];

interface TextChunkProps {
  chunks?: string[];
  delay?: number;
}

export default function TextChunk({
  chunks = textChunks,
  delay = 1,
}: TextChunkProps) {
  return (
    <>
      {chunks.flatMap((chunk, chunkIdx) => (
        <span
          key={`chunk-${delay === 1 ? "pri" : "com"}-${chunkIdx}`}
          className="chunk"
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
