import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';
import './Loading.css';

const Loading = ({ message = 'Cargando...', fullScreen = false }) => {
  return (
    <div className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}>
      <Loader2 className="spinner" size={48} />
      <p>{message}</p>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loading;
