import '../styles/Header.css';

import github from '../assets/GitHub_Invertocat_Dark.svg';
import linkedin from '../assets/In-Blue-72.png';
import email from '../assets/email.svg';

export const Header = () => {
  return (
    <div id='header'>
      <div>
        <p>
          Coren Frankel
          <br/>
          <span>
            Software Engineer
          </span>
        </p>
      </div>
      <ul>
        <li>
          <a href="https://github.com/coren-frankel">
            <img src={github} alt="Github icon" />
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/coren-frankel">
            <img src={linkedin} alt="LinkedIn icon" />
          </a>
        </li>
        <li>
          <a href="mailto:dev@corenfrankel.com">
            <img src={email} alt="Email icon" />
          </a>
        </li>
      </ul>
    </div>
  )
}