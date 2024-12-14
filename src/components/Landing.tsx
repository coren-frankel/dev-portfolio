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
  { chunks, shortDelay = false }:
    { chunks: string[], shortDelay?: boolean }) => {
  return (
    <>
      {chunks
        .map((chunk, chunkIdx) => (
          <span key={`${shortDelay ? 'primary' : 'user-input'}-${chunkIdx}`} className="chunk" style={{ animationDelay: `${shortDelay ? 0.2 : chunkIdx}s` }}>
            {chunk}
          </span>
        ))}
    </>
  )
}

const Landing = () => {
  const [command, setCommand] = useState('');
  const [chunkState, setChunkState] = useState<string[]>([]);
  const navigate = useNavigate();

  // Add visible class to the page to initiate fade in animation
  useEffect(() => {
    document.querySelector('.landing-page')?.classList.add('visible');
    return () => document.querySelector('.landing-page')?.classList.remove('visible');
  }, []);


  const acceptInputCommand = useCallback((command: string) => {
    if (command.match(/about/i) || command.match(/contact/i) || command.match(/home/i)) {
      setChunkState([...chunkState, `% ${command}`]);
      setChunkState([...chunkState, `Redirecting to ${command[0].toUpperCase()}${command.substring(1).toLowerCase()} page...`]);
      setTimeout(() => navigate(`/${command.toLowerCase()}`), 1500);
    } else {
      setChunkState([...chunkState, `Command: "${command}" not recognized`]);
    }
    setCommand('');
  }, [chunkState, navigate]);

  return (
    <div className='landing-page'>
      <div className="terminal lime">
        <pre>
          <Typography.Paragraph code className='lime'>
            <TextChunks chunks={textChunks} />
            <TextChunks chunks={chunkState} shortDelay />
            <Input
              prefix={<PercentageOutlined className='lime' />}
              styles={{
                prefix: { border: 'none', backgroundColor: 'black' },
                affixWrapper: { border: 'none', backgroundColor: 'black' }
              }}
              autoFocus
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
