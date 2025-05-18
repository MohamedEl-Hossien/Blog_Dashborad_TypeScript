import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../utils";

/**
 * Custom hook to fetch the authenticated user's profile information.
 * @param userId The user's unique ID.
 * @param enabled Whether the query should run.
 */
export function useUserProfileQuery(userId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["userData", userId],
    queryFn: () => fetchUserInfo({ userId }),
    enabled,
  });
}
