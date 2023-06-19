import React, { PropsWithChildren } from 'react';
import Navbar from './Navbar';
import './Layout.css';

type IProps = PropsWithChildren<unknown>;

export const Layout = ({ children }: IProps) => {
  return (
    <>
      <Navbar />
      <div className="body-wrapper">{children}</div>
    </>
  );
};
