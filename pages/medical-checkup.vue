<template>
  <DataTable :value="vacation" stripedRows tableStyle="min-width: 50rem">
    <Column field="title" header="Наименование мероприятия"></Column>
    <Column field="date" header="Дата о обследования">
      <template #body="{ data }">
        {{ data.date ? data.date.split("T")[0] : "-"  }}
      </template>
    </Column>
    <Column field="date_2" header="Очередное о обследования">
      <template #body="{ data }">
        {{ data.date_2 ? data.date_2.split("T")[0] : "-"  }}
      </template>
    </Column>

  </DataTable>
</template>

<script lang="ts" setup>
const appwrite = useAppwrite()
const vacation: Ref<any> = ref([])
onMounted(async () => {
  let data = await appwrite.database.listDocuments(
    "67c6dc2900328f8e22c8",
    "67c70f3800172d06fa59"
  );
  vacation.value = data.documents;
  console.log(vacation.value)
})

</script>

<style></style>