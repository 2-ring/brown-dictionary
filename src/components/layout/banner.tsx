import { Link } from 'react-router-dom';
import { Button } from '../common/button';

export const Banner = () => {
  return (
    <div className="bg-card-secondary rounded-xl border border-border/50 p-10 flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-bold leading-tight tracking-tight">
          <span className="text-primary">URBAN</span>
          <br />
          <span className="text-primary">DICTIONARY</span>
          <br />
          <span className="text-primary">IS WRITTEN</span>
          <br />
          <span className="text-primary">BY YOU</span>
        </h3>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-7xl">🍪</div>
        <Link to="/add">
          <Button variant="primary">Define a Word</Button>
        </Link>
      </div>
    </div>
  );
};
