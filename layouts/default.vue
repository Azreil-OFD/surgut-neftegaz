<template>
  <div v-if="slide" class="logo-slide">
  </div>
  <div :class="(slide ? 'wrapper ' : '')">
    <div class="header">
      <img class="logo" src="/assets/img/header-logo.jpg" alt="">
      <div class="text">
        <h1>Информационная система <br> для сотрудников ПАО {{ "<<Сургутнефтегаз>>" }}</h1>
      </div>
      <div class="panel">
        <span class="pi pi-search"></span>
        <span class="pi pi-user"></span>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <Button v-for="item in menu" :class="active_page === item.url ? 'active' : ''" severity="info"
          :label="item.label" @click="item.click" aria-label="Save" />
      </div>
      <div class="divider"></div>
      <div class="right">
        <slot />
      </div>
    </div>
  </div>
  <div v-if="slide" class="down-slide">
  </div>
</template>

<script lang="ts" setup>
const slide = ref(false)
const active_page = ref("/emty")
const router = useRouter()
const appwrite = useAppwrite()
const click_event = (url: string) => {
  return () => {
    active_page.value = url;
    router.push(url)
  }
}
const menu = [
  {
    label: "Личный кабинет",
    url: "/",
    click: click_event("/")
  },
  {
    label: "Отпуск",
    url: "/vacation",
    click: click_event("/vacation")
  },
  {
    label: "График работы",
    url: "/schedule",
    click: click_event("/schedule")
  },
  {
    label: "Медицинский осмотр",
    url: "/medical-checkup",
    click: click_event("/medical-checkup")
  },
  {
    label: "Обучение",
    url: "/training",
    click: click_event("/training")
  },
  {
    label: "Уведомление",
    url: "/notifications",
    click: click_event("/notifications")
  },
  {
    label: "Новости",
    url: "/news",
    click: click_event("/news")
  },
  {
    label: "Контакты",
    url: "/contacts",
    click: click_event("/contacts")
  }
];
onMounted(async () => {
  router.push("/emty")
  try {
    const user = await appwrite.account.get()
    console.log(user.prefs.avatar === "none")    
  } catch (error) {
    router.push('/login')
  }
})
</script>

<style lang="scss">
.header {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  justify-items: center;

  .text {
    text-align: center;
  }

  .logo {
    height: 10vh;
    padding: 1vh;
  }

  .panel {
    display: flex;
    flex-direction: row;
    gap: 2vh;
    padding: 0 2vh;
    align-items: center;

    .pi {
      font-size: 3vh;
      cursor: pointer;
    }

    .pi-user {
      border: 1px solid black;
      padding: 1.5vh;
      border-radius: 100vh;
      background-color: rgb(233, 233, 233);
    }
  }

  border-bottom: 1px solid black;
}

.wrapper {
  position: absolute;
  top: 8vh;
  left: 4vh;
  bottom: 4vh;
  right: 4vh;
  border: 1px solid black;

  .main {
    height: 77.9vh;
  }
}

.main {
  display: flex;
  height: 90vh;

  .left {
    flex: 0 0 14%;
    display: flex;
    flex-direction: column;
    padding: 1vh;
    gap: 1vh;

    Button {
      width: 100%;
    }

    .active {
      opacity: 0.8;
      border: 1px solid rgba(0, 132, 255, 0.897);
    }
  }

  .divider {
    flex: 0 0 1px;
    background-color: black;
  }

  .right {
    flex: 0 0 85.9%;
  }
}


.logo-slide {
  position: absolute;
  width: 40vh;
  height: 8vh;
  background-color: aqua;
}

.down-slide {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2vh;
  background-color: orange;
}

* {
  padding: 0;
  margin: 0;
}
</style>