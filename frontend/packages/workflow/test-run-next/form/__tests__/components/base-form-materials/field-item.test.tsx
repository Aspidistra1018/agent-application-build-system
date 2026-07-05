import React from 'react';

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { FieldItem } from '../../../src/components/base-form-materials/field-item';

describe('FieldItem', () => {
  // Test basic rendering
  it('should render title', () => {
    const title = 'Test Title';
    render(<FieldItem title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  // Test required tag rendering
  it('should render required marker', () => {
    render(<FieldItem title="Test" required />);
    const requiredMarker = screen.getByText('*');
    expect(requiredMarker).toBeInTheDocument();
  });

  // Test prompt information rendering
  it('should render tooltip', () => {
    const tooltipText = 'This is a tooltip';
    const el = render(<FieldItem title="Test" tooltip={tooltipText} />);
    const tooltipIcon = el.container.querySelector(
      '[data-content="This is a tooltip"]',
    );
    expect(tooltipIcon).toBeInTheDocument();
  });

  // test label rendering
  it('should render tag', () => {
    const tagText = 'New';
    render(<FieldItem title="Test" tag={tagText} />);
    const tagElement = screen.getByText(tagText);
    expect(tagElement).toBeInTheDocument();
  });

  // Test description information rendering
  it('should render description', () => {
    const descriptionText = 'This is a description';
    render(<FieldItem title="Test" description={descriptionText} />);
    const descriptionElement = screen.getByText(descriptionText);
    expect(descriptionElement).toBeInTheDocument();
  });

  // Test feedback rendering
  it('should render feedback', () => {
    const feedbackText = 'This is a feedback';
    render(<FieldItem title="Test" feedback={feedbackText} />);
    const feedbackElement = screen.getByText(feedbackText);
    expect(feedbackElement).toBeInTheDocument();
  });

  // Test child element rendering
  it('should render children', () => {
    const childText = 'Child Content';
    render(<FieldItem title="Test">{childText}</FieldItem>);
    const childElement = screen.getByText(childText);
    expect(childElement).toBeInTheDocument();
  });
});
