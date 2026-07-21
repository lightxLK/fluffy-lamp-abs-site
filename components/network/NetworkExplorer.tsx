'use client';

import { useState } from 'react';
import { DEFAULT_NETWORK_STATE_SLUG } from '@/data/network';
import { NetworkTable } from '@/components/network/NetworkTable';
import { NetworkIndiaMap } from '@/components/network/NetworkIndiaMap';
import { NetworkStateDetail } from '@/components/network/NetworkStateDetail';

export function NetworkExplorer() {
  const [selected, setSelected] = useState(DEFAULT_NETWORK_STATE_SLUG);

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.3fr_1fr] lg:gap-8">
      <NetworkTable selected={selected} onSelect={setSelected} />
      <NetworkIndiaMap
        selected={selected}
        onSelect={setSelected}
        className="w-full h-auto max-h-[70vh]"
      />
      <NetworkStateDetail selected={selected} />
    </div>
  );
}
