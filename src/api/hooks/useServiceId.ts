import { useQuery, UseQueryResult } from 'react-query';
import { http } from '../../services';
import { useAppDispatch } from '../../store/store.hooks';
import { saveServiceIdToStore } from '../../store/reducers/auth';

export function useServiceId(): UseQueryResult<{ service_id: string }> {
  const serviceIdQuery = (): Promise<{ service_id: string }> =>
    http.get(`/oauth/yandex/service-id?redirect_uri=${document.location.origin}`);
  const dispatch = useAppDispatch();

  return useQuery('serviceIdQuery', serviceIdQuery, {
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data) => dispatch(saveServiceIdToStore(data.service_id)),
  });
}
