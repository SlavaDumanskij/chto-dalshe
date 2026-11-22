import { ScrollView, StyleSheet, View } from 'react-native';

import { SelectionChip, type SelectionMode } from './SelectionChip';
import { SectionTitle } from './SectionTitle';

export type SelectionOption = {
  id: string;
  label: string;
};

type Props = {
  title: string;
  options: SelectionOption[];
  selectedIds: string[];
  mode: SelectionMode;
  layout: 'horizontal' | 'wrap';
  onSelect: (id: string) => void;
  chipWidth?: number;
};

export function SelectionSection({
  title,
  options,
  selectedIds,
  mode,
  layout,
  onSelect,
  chipWidth,
}: Props) {
  const chips = options.map(option => (
    <SelectionChip
      key={option.id}
      label={option.label}
      selected={selectedIds.includes(option.id)}
      mode={mode}
      onPress={() => onSelect(option.id)}
      width={chipWidth}
    />
  ));

  return (
    <View style={styles.section}>
      <SectionTitle>{title}</SectionTitle>
      {layout === 'horizontal' ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalRow}
        >
          {chips}
        </ScrollView>
      ) : (
        <View style={styles.wrapRow}>{chips}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 17,
  },
  horizontalRow: {
    gap: 7,
    paddingRight: 20,
    paddingTop: 10,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingTop: 10,
  },
});
