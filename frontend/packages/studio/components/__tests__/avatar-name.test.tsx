import { render } from '@testing-library/react';

import { AvatarName } from '../src/avatar-name';

describe('AvatarName', () => {
  it('should one image and @username', () => {
    const wrapper = render(
      <AvatarName
        name="BotNickName"
        username="BotUserName"
        avatar="https://sf-agent-web-cdn.coze.com/obj/agent-web-sg/obric/coze/favicon.1970.png"
      />,
    );
    expect(wrapper.getAllByRole('img').length).toBe(1);
    expect(wrapper.getByText(/^@BotUserName/)).toBeInTheDocument();
  });

  it('should two image', () => {
    const wrapper = render(
      <AvatarName
        name="BotNickName"
        username="BotUserName"
        avatar="https://sf-agent-web-cdn.coze.com/obj/agent-web-sg/obric/coze/favicon.1970.png"
        label={{
          icon: 'https://sf-agent-web-cdn.coze.com/obj/agent-web-sg/obric/coze/favicon.1970.png',
          name: 'test',
        }}
      />,
    );
    expect(wrapper.getAllByRole('img').length).toBe(2);
  });
});
