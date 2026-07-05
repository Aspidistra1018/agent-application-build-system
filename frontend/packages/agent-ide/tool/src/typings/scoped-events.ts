export type IEventCenterEventName = EventCenterEventName | string;

/**
 * Event Center built-in events
 */
export const enum EventCenterEventName {
  /**
   * The event name after the plugin is initialized
   */
  AbilityInitialed = 'abilityInitialed',
  /**
   * Collapse events that expand ContentBlock
   */
  ToggleContentBlock = 'toggleContentBlock',
  /**
   * Events of tab switching in Agent Modal
   */
  AgentModalTabChange = 'agentModalTabChange',
  /**
   * Stealth Changes in Agent Modal
   */
  AgentModalVisibleChange = 'agentModalVisibleChange',
}
