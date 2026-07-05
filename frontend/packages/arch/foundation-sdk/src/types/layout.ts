export interface BackButtonProps {
  onClickBack: () => void;
}

/** Navigation bar custom button properties */
export interface NavBtnProps {
  // Required, Nav. Item navigation component unique key, highlighted when the route matches
  navKey: string;
  //button icon
  icon?: React.ReactNode;
  // button name
  label: string | React.ReactNode;
  // Suffix Node
  suffix?: string | React.ReactNode;
  // Show only in the default mode of the left navigation bar
  onlyShowInDefault?: boolean;
  // Button click callback
  onClick: (e: React.MouseEvent) => void;
}
