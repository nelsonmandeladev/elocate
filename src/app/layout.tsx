import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}
export default function layout(props: LayoutProps) {
  const { children } = props;
  return children
}
