import {useAuth} from "@/stores/auth.js";

export default async function session_routes(to, from, next) {

  if (to.meta?.auth) {
    const auth = useAuth();
      if (auth.token && auth.user) {
      const isAuthenticated = await auth.checkToken();
      if (isAuthenticated) next();

    } else {
      next({ name: "home" });
    }

  } else {
    next();
}
}