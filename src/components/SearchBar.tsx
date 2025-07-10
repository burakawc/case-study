import React from 'react';
import { Input, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const { useBreakpoint } = Grid;

interface SearchBarProps {
  placeholder: string;
  onSearch: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowClear?: boolean;
}

/**
 * Reusable search bar component
 * 
 * @param placeholder - Placeholder text for the search input
 * @param onSearch - Function called when search is triggered
 * @param onChange - Optional function called when input changes
 * @param allowClear - Whether to show clear button
 * @returns JSX element containing the search bar
 */
const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearch,
  onChange,
  allowClear = true
}) => {
  const screens = useBreakpoint();

  return (
    <Search
      placeholder={placeholder}
      allowClear={allowClear}
      enterButton={<SearchOutlined />}
      size="large"
      style={{ 
        width: screens.xs ? '100%' : screens.sm ? '100%' : 300,
        maxWidth: 400
      }}
      onChange={onChange}
      onSearch={onSearch}
    />
  );
};

export default SearchBar; 