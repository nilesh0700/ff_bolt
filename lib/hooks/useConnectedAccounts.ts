import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/lib/supabase-auth';

interface ConnectedAccount {
  id: string;
  user_id: string;
  account_type: string;
  account_name: string;
  is_connected: boolean;
  connection_data?: any;
  created_at: string;
  updated_at: string;
}

interface ConnectAccountData {
  account_type: string;
  account_name: string;
}

interface UpdateAccountData {
  account_type: string;
  is_connected: boolean;
}

// Fetch connected accounts
export function useConnectedAccounts() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['connected-accounts', user?.id],
    queryFn: async (): Promise<ConnectedAccount[]> => {
      const response = await fetch('/api/connected-accounts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch connected accounts');
      }
      
      const data = await response.json();
      return data.accounts || [];
    },
    enabled: !!user, // Only run query if user is authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

// Connect an account
export function useConnectAccount() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (accountData: ConnectAccountData): Promise<ConnectedAccount> => {
      const response = await fetch('/api/connected-accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to connect account');
      }

      const data = await response.json();
      return data.account;
    },
    onSuccess: () => {
      // Invalidate and refetch connected accounts
      queryClient.invalidateQueries({ queryKey: ['connected-accounts', user?.id] });
    },
  });
}

// Update account connection status
export function useUpdateAccountStatus() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (updateData: UpdateAccountData): Promise<ConnectedAccount> => {
      const response = await fetch('/api/connected-accounts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update account status');
      }

      const data = await response.json();
      return data.account;
    },
    onSuccess: () => {
      // Invalidate and refetch connected accounts
      queryClient.invalidateQueries({ queryKey: ['connected-accounts', user?.id] });
    },
  });
}

// Helper function to get connected account types as array
export function useConnectedAccountTypes() {
  const { data: accounts = [], isLoading, error } = useConnectedAccounts();
  
  const connectedTypes = accounts
    .filter(account => account.is_connected)
    .map(account => account.account_type);

  return {
    connectedAccountTypes: connectedTypes,
    isLoading,
    error,
    totalConnected: connectedTypes.length,
  };
} 