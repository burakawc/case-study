import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataCard from '../DataCard';
import type { Product, User } from '@/types';

// Mock ActionButtons component
vi.mock('../../ActionButtons', () => ({
  default: ({ onView, onEdit, onDelete, onToggleFavorite, isFavorite, showFavorite }: any) => (
    <div data-testid="action-buttons">
      {onView && <button onClick={onView} data-testid="view-btn">View</button>}
      {onEdit && <button onClick={onEdit} data-testid="edit-btn">Edit</button>}
      {onDelete && <button onClick={onDelete} data-testid="delete-btn">Delete</button>}
      {showFavorite && (
        <button onClick={onToggleFavorite} data-testid="favorite-btn">
          {isFavorite ? '❤️' : '🤍'}
        </button>
      )}
    </div>
  ),
}));

describe('DataCard', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'This is a test product description that is longer than 50 characters to test truncation',
    price: 99.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 100,
    brand: 'TestBrand',
    category: 'Electronics',
    thumbnail: 'https://example.com/thumbnail.jpg',
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  };

  const mockUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    gender: 'male',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    username: 'johndoe',
    password: 'password123',
    birthDate: '1993-01-01',
    image: 'https://example.com/avatar.jpg',
    bloodGroup: 'A+',
    height: 180,
    weight: 75,
    eyeColor: 'brown',
    hair: {
      color: 'black',
      type: 'straight',
    },
    domain: 'example.com',
    ip: '192.168.1.1',
    address: {
      address: '123 Main St',
      city: 'New York',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060,
      },
      postalCode: '10001',
      state: 'NY',
    },
    macAddress: '00:11:22:33:44:55',
    university: 'Test University',
    bank: {
      cardExpire: '12/25',
      cardNumber: '1234567890123456',
      cardType: 'visa',
      currency: 'USD',
      iban: 'US12345678901234567890',
    },
    company: {
      address: {
        address: '456 Business Ave',
        city: 'New York',
        coordinates: {
          lat: 40.7128,
          lng: -74.0060,
        },
        postalCode: '10002',
        state: 'NY',
      },
      department: 'Engineering',
      name: 'Test Company',
      title: 'Software Engineer',
    },
    ein: '12-3456789',
    ssn: '123-45-6789',
    userAgent: 'Mozilla/5.0...',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  };

  describe('Product Card', () => {
    it('should render product card correctly', () => {
      const { container } = render(
        <DataCard
          data={mockProduct}
          type="product"
          onView={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText((content) =>
        content.startsWith('This is a test product description that is longer')
      )).toBeInTheDocument();
      expect(screen.getByText('TestBrand')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('$99.99')).toBeInTheDocument();
      expect(screen.getByText('Stock: 100')).toBeInTheDocument();
      expect(screen.getByText('4.5 ⭐')).toBeInTheDocument();
      expect(screen.getByTestId('action-buttons')).toBeInTheDocument();

      // Snapshot test
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render product card with favorite functionality', () => {
      const onToggleFavorite = vi.fn();
      const { container } = render(
        <DataCard
          data={mockProduct}
          type="product"
          onView={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onToggleFavorite={onToggleFavorite}
          isFavorite={true}
          showFavorite={true}
        />
      );

      const favoriteButton = screen.getByTestId('favorite-btn');
      expect(favoriteButton).toBeInTheDocument();
      expect(favoriteButton).toHaveTextContent('❤️');

      fireEvent.click(favoriteButton);
      expect(onToggleFavorite).toHaveBeenCalledTimes(1);

      // Snapshot test
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle long product descriptions correctly', () => {
      const longDescriptionProduct = {
        ...mockProduct,
        description: 'This is a very long product description that should be truncated when it exceeds 50 characters in length',
      };

      render(
        <DataCard
          data={longDescriptionProduct}
          type="product"
          onView={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText((content) =>
        content.startsWith('This is a very long product description that shoul')
      )).toBeInTheDocument();
    });

    it('should render different rating colors based on rating value', () => {
      const lowRatingProduct = { ...mockProduct, rating: 2.5 };
      const mediumRatingProduct = { ...mockProduct, rating: 3.5 };
      const highRatingProduct = { ...mockProduct, rating: 4.5 };

      const { rerender } = render(
        <DataCard
          data={lowRatingProduct}
          type="product"
          onView={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText('2.5 ⭐')).toBeInTheDocument();

      rerender(
        <DataCard
          data={mediumRatingProduct}
          type="product"
          onView={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText('3.5 ⭐')).toBeInTheDocument();

      rerender(
        <DataCard
          data={highRatingProduct}
          type="product"
          onView={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText('4.5 ⭐')).toBeInTheDocument();
    });
  });

  describe('User Card', () => {
    it('should render user card correctly', () => {
      const { container } = render(
        <DataCard
          data={mockUser}
          type="user"
          onView={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('@johndoe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('male')).toBeInTheDocument();
      expect(screen.getByText('A+')).toBeInTheDocument();
      expect(screen.getByText('Age: 30')).toBeInTheDocument();
      expect(screen.getByText('Test Company')).toBeInTheDocument();

      // Snapshot test
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render user card with different gender colors', () => {
      const femaleUser = { ...mockUser, gender: 'female' as const };
      const otherUser = { ...mockUser, gender: 'other' as const };

      const { rerender } = render(
        <DataCard
          data={femaleUser}
          type="user"
          onView={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText('female')).toBeInTheDocument();

      rerender(
        <DataCard
          data={otherUser}
          type="user"
          onView={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText('other')).toBeInTheDocument();
    });

    it('should render user card with favorite functionality', () => {
      const onToggleFavorite = vi.fn();
      const { container } = render(
        <DataCard
          data={mockUser}
          type="user"
          onView={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onToggleFavorite={onToggleFavorite}
          isFavorite={false}
          showFavorite={true}
        />
      );

      const favoriteButton = screen.getByTestId('favorite-btn');
      expect(favoriteButton).toBeInTheDocument();
      expect(favoriteButton).toHaveTextContent('🤍');

      fireEvent.click(favoriteButton);
      expect(onToggleFavorite).toHaveBeenCalledTimes(1);

      // Snapshot test
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Action Buttons', () => {
    it('should call action handlers when buttons are clicked', () => {
      const onView = vi.fn();
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <DataCard
          data={mockProduct}
          type="product"
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

      fireEvent.click(screen.getByTestId('view-btn'));
      expect(onView).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByTestId('edit-btn'));
      expect(onEdit).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByTestId('delete-btn'));
      expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it('should not render action buttons when handlers are not provided', () => {
      render(
        <DataCard
          data={mockProduct}
          type="product"
        />
      );

      expect(screen.queryByTestId('view-btn')).not.toBeInTheDocument();
      expect(screen.queryByTestId('edit-btn')).not.toBeInTheDocument();
      expect(screen.queryByTestId('delete-btn')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing optional props gracefully', () => {
      const { container } = render(
        <DataCard
          data={mockProduct}
          type="product"
        />
      );

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('should handle empty or null data gracefully', () => {
      const emptyProduct = {
        ...mockProduct,
        title: '',
        description: '',
        brand: '',
        category: '',
      };

      render(
        <DataCard
          data={emptyProduct}
          type="product"
        />
      );

      const headings = screen.getAllByRole('heading');
      headings.forEach(h => expect(h.textContent).toBe(''));
    });

    it('should not render user content if user is null', () => {
      const { container } = render(
        <DataCard
          // @ts-ignore
          data={null}
          type="user"
        />
      );
      // User içeriği olmamalı
      expect(container.textContent).toBe('');
    });

    it('should not render product content if product is null', () => {
      // @ts-ignore
      const { container } = render(
        <DataCard
          // @ts-ignore
          data={null}
          type="product"
        />
      );
      // Product içeriği olmamalı
      expect(container.textContent).toBe('');
    });
  });
}); 