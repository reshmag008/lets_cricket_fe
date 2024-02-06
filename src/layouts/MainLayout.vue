<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div @click="$router.push('/')" style="cursor: pointer">
            Manna Premier League
          </div>
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <div style="margin-top: 20px"></div>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Player Registration",
    icon: "school",
    link: "/player-registration",
  },
  {
    title: "Players",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "/players",
  },
  {
    title: "Team Registration",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "/team-registration",
  },

  {
    title: "Teams",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "/teams",
  },

  {
    title: "Auction",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "/auction",
  },

  // {
  //   title: "PDF",
  //   caption: "chat.quasar.dev",
  //   icon: "chat",
  //   link: "/pdf",
  // },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
