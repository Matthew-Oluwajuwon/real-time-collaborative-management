import {
  AntdConfigProvider,
  AppQueryClientProvider,
  AppRouterProvider,
} from "./features/shared";

const App = () => {
  return (
    <AppQueryClientProvider>
      <AntdConfigProvider>
        <AppRouterProvider />
      </AntdConfigProvider>
    </AppQueryClientProvider>
  );
};

export default App;
