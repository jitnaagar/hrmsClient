'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { list } from './data';

function Master() {
  const params = useParams();

  const { slug } = params;
  const component = list.find((i) => i.id === slug).component;

  return <div>{component}</div>;
}

export default Master;
