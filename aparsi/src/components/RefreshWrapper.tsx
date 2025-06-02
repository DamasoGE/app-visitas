// src/components/RefreshWrapper.tsx
import React, { ReactNode } from 'react';
import { ScrollView, RefreshControl, ScrollViewProps } from 'react-native';

interface RefreshWrapperProps extends ScrollViewProps {
  refreshing: boolean;
  onRefresh: () => void;
  children: ReactNode;
}

const RefreshWrapper: React.FC<RefreshWrapperProps> = ({
  refreshing,
  onRefresh,
  children,
  ...scrollViewProps
}) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FF6300']} />
      }
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );
};

export default RefreshWrapper;
