<template>
  <DataTable :value="vacation" stripedRows tableStyle="min-width: 50rem">
    <Column field="title" header="Наименование мероприятия"></Column>
    <Column field="start" header="Начало">
      <template #body="{ data }">
        {{ data.start.split('T')[0] }}
      </template>
    </Column>
    <Column field="end" header="Конец">
      <template #body="{ data }">
        {{ data.end.split('T')[0] }}
      </template>
    </Column>
    <Column field="days" header="Количество календарных дней">
      <template #body="{ data }">
        {{
          // @ts-ignore
          Math.ceil((new Date(data.end) - new Date(data.start)) / (1000 * 60 * 60 * 24))
        }}
      </template>
    </Column>
    <Column field="status" header="Статус">
      <template #body="{ data }">
       
        <Tag :severity="(() => {
          if(data.status === 'Отклонен') return 'danger'
          if(data.status === 'Оформлен') return 'success'
          if(data.status === 'План') return 'info'

        })()" :value="data.status"></Tag>
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
    "67c6f94d002f5a5e9512"
  );
  vacation.value = data.documents;
})

</script>

<style></style>