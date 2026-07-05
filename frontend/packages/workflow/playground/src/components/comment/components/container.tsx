import { type ReactNode, type FC, type CSSProperties } from 'react';

import classNames from 'classnames';

interface ICommentContainer {
  focused: boolean;
  children?: ReactNode;
  style?: React.CSSProperties;
}

export const CommentContainer: FC<ICommentContainer> = props => {
  const { focused, children, style } = props;

  const scrollbarStyle = {
    // scroll bar style
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgb(159 159 158 / 65%) transparent',
    // Styles for WebKit browsers such as Chrome, Safari
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(159 159 158 / 65%)',
      borderRadius: '20px',
      border: '2px solid transparent',
    },
  } as unknown as CSSProperties;

  return (
    <div
      className={classNames(
        'workflow-comment-container flex flex-col items-start justify-start w-full h-full rounded-[8px] outline-solid py-[6px] px-[10px] overflow-y-auto overflow-x-hidden outline-[1px]',
        {
          'bg-[#FFF3EA] outline-[#FF811A]': focused,
          'bg-[#FFFBED] outline-[#F2B600]': !focused,
        },
      )}
      data-flow-editor-selectable="false"
      style={{
        // Tailwind does not support the style of outline, so you need to use style to set it here.
        outline: focused ? '1px solid #FF811A' : '1px solid #F2B600',
        ...scrollbarStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
