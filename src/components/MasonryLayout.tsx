import { PinCard } from './PinCard';
import { Pin } from '../store';

interface MasonryLayoutProps {
  pins: Pin[];
}

export function MasonryLayout({ pins }: MasonryLayoutProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 masonry-col pt-24 px-4 w-full max-w-screen-2xl mx-auto">
      {pins.map(pin => (
        <PinCard key={pin.id} pin={pin} />
      ))}
    </div>
  );
}
