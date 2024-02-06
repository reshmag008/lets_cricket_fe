const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/player-registration",
        component: () => import("components/PlayerRegistration.vue"),
      },
      {
        path: "/players",
        component: () => import("components/PlayersList.vue"),
      },
      {
        path: "/team-registration",
        component: () => import("components/TeamRegistration.vue"),
      },
      {
        path: "/teams",
        component: () => import("components/TeamList.vue"),
      },
      {
        path: "/auction",
        component: () => import("components/AuctionCenter.vue"),
      },
      {
        path: "/pdf",
        component: () => import("components/pdfTest.vue"),
      },
    ],
  },

  // {
  //   path: "/player-registration",
  //   component: () => import("components/PlayerRegistration.vue"),
  //   // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
