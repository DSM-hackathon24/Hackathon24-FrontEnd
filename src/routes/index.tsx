import { CommunityCreatePage } from "../pages/community/createPage";
import { CommunityDetailPage } from "../pages/community/detailPage";
import { CommunityPage } from "../pages/community/listPage";
import { MapPage } from "../pages/mapPage";

interface RouterType {
  path: string;
  element: JSX.Element | JSX.Element[];
}

export const rootRouter: RouterType[] = [
  {
    path: "/",
    element: (
      <main>
        <p>https://.../map</p>
        <p>https://.../community</p>
        <p>https://.../community/[id]</p>
        <p>https://.../community/create</p>
      </main>
    ),
  },
  {
    path: "/map",
    element: <MapPage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
  {
    path: "/community/create",
    element: <CommunityCreatePage />,
  },
  {
    path: "/community/:id",
    element: <CommunityDetailPage />,
  },
];
