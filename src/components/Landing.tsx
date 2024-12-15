import '../styles/Landing.css';
import { Input, Typography } from 'antd';
import { PercentageOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const textChunks = [
  "Hiya! I'm Coren Frankel, but some call me \"Kern\"",
  "I'm a Software Developer from Denver, CO",
  "Welcome to my personal website!",
  "Here's how to navigate:",
  "Type 'home' to go to the home page",
  "Type 'about' to learn more about me",
  "Type 'contact' to reach out",
  "Press Enter to execute command"
];


const TextChunks = (
  { chunks, delay = 1 }:
    { chunks: string[], delay?: number }) => {
  return (
    <>
      {chunks.flatMap((chunk, chunkIdx) => (
        <span
          key={`chunk-${delay ? 'pri' : 'com'}-${chunkIdx}`}
          className='chunk'
        >
          {chunk.split('').map((char, idx) => (
            <span
              key={`${delay ? 'pri' : 'com'}-${idx * chunkIdx}`}
              className="inline"
              style={{ animationDelay: `${delay + (chunkIdx + idx * 0.025)}s` }}
            >
              {char}
            </span>
          ))}
        </span>
      ))
      }
    </>
  )
}

const Landing = () => {
  const [command, setCommand] = useState('');
  const [chunkState, setChunkState] = useState<string[]>([]);
  const navigate = useNavigate();

  // Add visible class for fade-in animation
  useEffect(() => {
    document.querySelector('.landing-page')?.classList.add('visible');
    return () => document.querySelector('.landing-page')?.classList.remove('visible');
  }, []);

  // TODO: Add more hidden routes and terminal commands
  // labels: enhancement
  // iframe of NinjaSweeper https://coren-frankel.github.io/NinjaSweeper/
  
  // Home page navigation
  const acceptInputCommand = useCallback((command: string) => {
    if (command.match(/about/i) || command.match(/contact/i) || command.match(/home/i)) {
      setChunkState([...chunkState, `% ${command}`]);
      setChunkState([...chunkState, `Redirecting to ${command[0].toUpperCase()}${command.substring(1).toLowerCase()} page...`]);
      setTimeout(() => navigate(`/${command.toLowerCase()}`), 1500);
    } else if (command.match(/white rabbit/i)) {
      setChunkState([...chunkState, 'Follow the white rabbit.']);
      setTimeout(() => navigate("/the-matrix-has-you"), 3000);
    } else if (command.match(/clear/i)) {
      setChunkState([]);
    } else {
      setChunkState([...chunkState, `Command: "${command}" not recognized`]);
    }
    setCommand('');
  }, [chunkState, navigate]);

  return (
    <div className='landing-page'>
      <div className="terminal lime">
        <pre>
          <Typography.Paragraph code className='lime' id="code">
            <TextChunks chunks={textChunks} />
            <TextChunks chunks={chunkState} delay={0.01} />
            <Input
              prefix={<PercentageOutlined className='lime' />}
              styles={{
                prefix: { border: 'none', backgroundColor: '#111' },
                affixWrapper: { border: 'none', backgroundColor: '#111', boxShadow: 'none' }
              }}
              autoFocus
              autoComplete='none'
              aria-autocomplete='none'
              id="command-line"
              className='lime'
              contentEditable
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              onPressEnter={() => acceptInputCommand(command)}
            />
          </Typography.Paragraph>
        </pre>
      </div>
    </div>
  );
};

export default Landing;
