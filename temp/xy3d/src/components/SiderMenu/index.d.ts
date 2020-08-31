import React from "react";

export interface SiderMenuProps {
  isMobile: boolean;
  menuData: any[];
  onCollapse: (payload: boolean) => void;
}

export default class SiderMenuWrapper extends React.Component<
  SiderMenuProps,
  any
> {}
