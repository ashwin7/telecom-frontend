import React from 'react';
import { render, screen } from '@testing-library/react';
import NewPlanFormDialog from '../NewPlanFormDialog'; // Replace with actual path

test('renders the dialog title based on formLabel prop', () => {
  render(<NewPlanFormDialog formLabel="Assign New Plan" isFormOpen={true} onClose={() => jest.fn()} />);
  const dialogTitle = screen.getByText(/assign new plan/i);
  expect(dialogTitle).toBeInTheDocument();
});

test('opens the dialog when isFormOpen is true', () => {
  render(<NewPlanFormDialog formLabel="Assign New Plan" isFormOpen={true} onClose={() => jest.fn()} />);
  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
});

test('closes the dialog on cancel button click', () => {
  render(<NewPlanFormDialog formLabel="Assign New Plan" isFormOpen={true} onClose={jest.fn()} />);
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  fireEvent.click(cancelButton);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); // Uses queryByRole for checking absence
});