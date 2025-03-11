import { useState } from "react";

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(true);

  return { user, isLoading };
}
