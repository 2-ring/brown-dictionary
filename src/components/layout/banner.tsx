import { Link } from 'react-router-dom';
import { Button } from '../common/button';

export const Banner = () => {
  return (
    <div className="bg-ud-navy-light rounded-lg border border-ud-border p-8 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">
          <span className="text-ud-blue">URBAN</span>
          <br />
          <span className="text-ud-blue">DICTIONARY</span>
          <br />
          <span className="text-ud-blue">IS WRITTEN</span>
          <br />
          <span className="text-ud-blue">BY YOU</span>
        </h3>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-6xl">🍪</div>
        <Link to="/add">
          <Button variant="primary">Define a Word</Button>
        </Link>
      </div>
    </div>
  );
};
