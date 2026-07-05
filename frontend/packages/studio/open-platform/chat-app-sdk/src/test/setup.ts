vi.mock('@/client', () => ({
  default: vi.fn(),
  WebChatClient: vi.fn(),
}));

vi.mock('@coze-studio/open-chat', () => ({
  default: vi.fn(),
}));

vi.stubGlobal('IS_DEV_MODE', false);

beforeEach(() => {
  global.alert = info => {
    console.log(info);
  };
});
