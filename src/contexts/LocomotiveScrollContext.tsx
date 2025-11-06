// src/contexts/LocomotiveScrollContext.tsx
"use client";

import { createContext } from 'react';

// Este é o "contentor" que irá partilhar a instância do scroll
export const LocomotiveScrollContext = createContext({
  scroll: null as any // Começa como nulo
});