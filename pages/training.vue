<template>
  <div class="traning">
    <div class="title" style="padding: 3vh;">
      <div v-for="link in links">
        {{link.title}}: <a :href="link.url">{{link.text}}</a>
        <br>
      </div>
    </div>
    <hr>

    <DataTable :value="vacation" stripedRows tableStyle="min-width: 50rem">
      <Column field="title" header="Наименование мероприятия"></Column>
      <Column field="start" header="Дата о обследования">
        <template #body="{ data }">
          {{ data.start ? data.start.split("T")[0] : "-" }}
        </template>
      </Column>
      <Column field="end" header="Очередное о обследования">
        <template #body="{ data }">
          {{ data.end ? data.end.split("T")[0] : "-" }}
        </template>
      </Column>
      <Column field="type" header="Форма обучения">
        <template #body="{ data }">

          <Tag :severity="(() => {
            if (data.type === 'с/отр') return 'warn'
            if (data.type === 'э/смеш') return 'secondary'

          })()" :value="data.type"></Tag>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
const appwrite = useAppwrite()
const vacation: Ref<any> = ref([])
const links: Ref<any> = ref([])

onMounted(async () => {
  let data = await appwrite.database.listDocuments(
    "67c6dc2900328f8e22c8",
    "67c7114f003c7b42ca40"
  );
  vacation.value = data.documents;


  let link = await appwrite.database.listDocuments(
    "67c6dc2900328f8e22c8",
    "67c713190037ea5adbf4",
    [
        appwrite.Query.equal('page', 'traning')
    ]
  );
  links.value = link.documents;
})

</script>

<style></style>