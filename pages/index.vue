<template>
  <div class="profile">
    <div class="card">
      <div class="avatar">
        <i class="pi pi-user" style="font-size: 2.5rem"></i>
      </div>
      <div class="fullname">
        {{ fullname }}
      </div>
    </div>

    <Panel header="Настроки" toggleable>
      <IftaLabel>
        <InputText id="email" v-model="email" />
        <label for="email">Адрес электронной почты</label>
      </IftaLabel>
    </Panel>

    <Panel header="Организация" toggleable>
      <span class="item">
        <div class="title">
          Организационная еденица
        </div>
        <div class="content">
          {{ org_ed }}
        </div>
      </span>
      <span class="item">
        <div class="title">
          Штатная должность/профессия
        </div>
        <div class="content">
          {{ org_dl }}
        </div>
      </span>
    </Panel>
  </div>

</template>

<script lang="ts" setup>
const { account } = useAppwrite()
const fullname = ref("");
const email = ref("");
const org_ed = ref("");
const org_dl = ref("");
onMounted(async () => {
  const user = await account.get()
  email.value = user.email;
  org_ed.value = user.prefs.org_ed
  org_dl.value = user.prefs.org_dl
  fullname.value = user.prefs.FIO
})
</script>

<style lang="scss">
.p-iftalabel {
  --p-iftalabel-focus-color: #0989b9;
  --p-inputtext-focus-border-color: #0989b9;

  input {
    width: 100%;
  }
}
.p-panel-content {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  .item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.profile {
  padding: 2vh;
  display: flex;
  flex-direction: column;
  gap: 2vh;

  .card {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2vh;
    border: 1px solid var(--p-panel-border-color);
    border-radius: var(--p-panel-border-radius);
    background: var(--p-panel-background);
    color: var(--p-panel-color);
    padding: 2vh;

    .avatar {
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
  }
}
</style>