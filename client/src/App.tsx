import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { AppRouter } from '@/routes/AppRouter';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
