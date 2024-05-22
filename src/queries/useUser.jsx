// import { useQuery } from "@tanstack/react-query";

// const useUserInfo = () => {
//   return useQuery({
//     queryKey: ["private", "user"],
//     queryFn: async () => {
//       const data = localStorage.getItem("user");

//       return JSON.parse(data);
//     },

//     enabled: localStorage.getItem("user")?.length > 6,
//     refetchInterval: 30 * 1000,
//   });
// };

// export default useUserInfo;
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const query = useQuery({
    queryKey: ["private", "user"],
    queryFn: async () => {
      const data = localStorage.getItem("user");
      return JSON.parse(data);
    },
    enabled: isClient && localStorage.getItem("user")?.length > 6,
    refetchInterval: 30 * 1000,
  });

  // Return a fallback during server-side rendering
  if (!isClient) {
    return { data: null, isLoading: true, error: null };
  }

  return query;
};

export default useUserInfo;

