import { type FC, Fragment } from 'react';

import cls from 'classnames';
import { cozeOfficialHost } from '@coze-studio/open-env-adapter';
import { I18n } from '@coze-arch/i18n';

import { type FooterConfig } from '@/types/client';

import styles from './index.module.less';

const getDefaultText = () =>
  I18n.t('web_sdk_official_banner', {
    docs_link: (
      <a
        key="web_sdk_official_banner"
        className={styles.link}
        href={cozeOfficialHost}
        target="_blank"
      >
        {I18n.t('web_sdk_official_banner_link')}
      </a>
    ),
  });

const getTextByExpress = (
  expressionText: string,
  linkvars?: Record<
    string,
    {
      text: string;
      link: string;
    }
  >,
) => {
  const arrLinks: React.ReactNode[] = [];
  const splitLinkTag = '{{{link}}}';
  const textWithLinkTags = expressionText.replace(
    /\{\{\s*(\w+)\s*\}\}/g,
    (_, key) => {
      const { link, text: linkText } = linkvars?.[key] || {};
      if (link && linkText) {
        arrLinks.push(
          <a className={styles.link} href={link} target="_blank">
            {linkText}
          </a>,
        );
        return splitLinkTag;
      } else {
        arrLinks.push(linkText || '');
      }
      return splitLinkTag;
    },
  );
  return textWithLinkTags.split(splitLinkTag).map((item, index) => (
    <Fragment key={`text_link_${index}`}>
      {item}
      {arrLinks[index]}
    </Fragment>
  ));
};

const ChatFooter: FC<
  FooterConfig & {
    footerClassName?: string;
    textClassName?: string;
    theme?: 'bg-theme' | 'light';
  }
> = ({
  isShow = true,
  expressionText,
  linkvars,
  footerClassName,
  textClassName,
  theme,
}) =>
  isShow ? (
    <footer
      className={cls(styles.footer, footerClassName, {
        [styles['bg-theme']]: theme === 'bg-theme',
      })}
    >
      <span className={cls(styles.text, textClassName)}>
        {expressionText
          ? getTextByExpress(expressionText, linkvars)
          : getDefaultText()}
      </span>
    </footer>
  ) : null;

export default ChatFooter;
