import React from 'react';

function Main({ children }: { children: React.ReactNode }) {
  return <main className='main'>{children}</main>;
}

export default Main;
