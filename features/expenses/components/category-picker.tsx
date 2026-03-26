import { View, Text, Pressable, ScrollView } from 'react-native';
import { CategoryIcon } from './category-icon';
import { CATEGORIES, CATEGORY_CONFIG } from '../constants/categories';
import type { ExpenseCategory } from '../types/expense.types';

interface CategoryPickerProps {
  selected: ExpenseCategory;
  onSelect: (category: ExpenseCategory) => void;
}

export function CategoryPicker({
  selected,
  onSelect,
}: CategoryPickerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {CATEGORIES.map((cat) => {
        const config = CATEGORY_CONFIG[cat];
        const isActive = selected === cat;
        return (
          <Pressable
            key={cat}
            className={`items-center gap-1 px-3 py-2 rounded-xl border ${
              isActive
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-200 bg-white'
            }`}
            onPress={() => onSelect(cat)}
          >
            <CategoryIcon category={cat} size={16} />
            <Text
              className={`text-xs font-medium ${
                isActive ? 'text-primary-700' : 'text-neutral-600'
              }`}
            >
              {config.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
