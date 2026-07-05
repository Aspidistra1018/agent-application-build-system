import { sliceEditor } from '@/component/onboarding-message/onboarding-editor/method/slice-editor';

// Vi.mock needs to be at the top because it will be promoted
vi.mock('@coze-common/md-editor-adapter', () => ({
  ZoneDelta: vi.fn().mockImplementation(() => ({
    retain: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
  })),
}));

// Import the simulated ZoneDelta
import { ZoneDelta } from '@coze-common/md-editor-adapter';

describe('sliceEditor', () => {
  let editorRef;
  let maxCount;
  let mockedEditor;
  let mockZoneDeltaInstance;

  beforeEach(() => {
    vi.resetAllMocks();

    // Create a new simulation instance
    mockZoneDeltaInstance = {
      retain: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
    };

    // Implementation of Reset ZoneDelta Constructor
    vi.mocked(ZoneDelta).mockImplementation(() => mockZoneDeltaInstance);

    mockedEditor = {
      selection: {
        getSelection: vi.fn(),
      },
      getContentState: vi.fn().mockReturnValue({
        getZoneState: vi.fn(),
        apply: vi.fn(),
      }),
    };
    editorRef = { current: mockedEditor };
    maxCount = 5;
  });

  it('returns early when editorRef is not current', () => {
    editorRef.current = null;

    const result = sliceEditor(editorRef, maxCount);

    expect(result).toBeUndefined();
  });

  it('returns early when zoneState is not found', () => {
    mockedEditor.selection.getSelection.mockReturnValue({
      start: { zoneId: 'zone1' },
    });
    mockedEditor.getContentState.mockReturnValue({
      getZoneState: vi.fn().mockReturnValue(null),
    });

    const result = sliceEditor(editorRef, maxCount);

    expect(result).toBeUndefined();
  });

  it('does not slice when currentCount is less than maxCount', () => {
    mockedEditor.selection.getSelection.mockReturnValue({
      start: { zoneId: 'zone1' },
    });
    mockedEditor.getContentState.mockReturnValue({
      getZoneState: vi
        .fn()
        .mockReturnValue({ totalWidth: vi.fn().mockReturnValue(4) }),
    });

    const result = sliceEditor(editorRef, maxCount);

    expect(result).toBeUndefined();
  });

  it('slices when currentCount is more than maxCount', () => {
    const mockApply = vi.fn();
    mockedEditor.selection.getSelection.mockReturnValue({
      start: { zoneId: 'zone1' },
    });
    mockedEditor.getContentState.mockReturnValue({
      apply: mockApply,
      getZoneState: vi
        .fn()
        .mockReturnValue({ totalWidth: vi.fn().mockReturnValue(7) }),
    });

    sliceEditor(editorRef, maxCount);

    expect(ZoneDelta).toHaveBeenCalledWith({ zoneId: 'zone1' });
    expect(mockZoneDeltaInstance.retain).toHaveBeenCalledWith(maxCount);
    expect(mockZoneDeltaInstance.delete).toHaveBeenCalledWith(1); // The actual calculated value is 1.
    expect(mockApply).toHaveBeenCalled();
  });
});
