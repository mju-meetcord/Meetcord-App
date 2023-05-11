declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

interface FormData {
  append(name: string, value: string | Blob | object, fileName?: string): void;
}
