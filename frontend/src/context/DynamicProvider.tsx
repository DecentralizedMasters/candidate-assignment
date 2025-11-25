import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import ErrorDisplay from '../components/ui/ErrorDisplay';

export function DynamicProvider({ children }: { children: React.ReactNode }) {
  const environmentId = import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID;
  if (!environmentId || environmentId.length !== 36 ) {
    const configError = 'VITE_DYNAMIC_ENVIRONMENT_ID environment variable is required';
    return <ErrorDisplay error={configError}/>
  }

  return (
    <DynamicContextProvider
      settings={{
        environmentId,
        walletConnectors: [EthereumWalletConnectors]
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}

