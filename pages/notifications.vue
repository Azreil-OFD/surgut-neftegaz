<template>
  <DataTable :value="notifications" stripedRows tableStyle="min-width: 50rem">
    <Column field="title" header="Наименование мероприятия"></Column>
    <Column field="dender" header="Отправитель"></Column>
    <Column field="send" header="Дата отправления">
      <template #body="{ data }">
        {{ data.send.split('T')[0] }}
      </template>
    </Column>
    <Column field="dead_line" header="Срок">
      <template #body="{ data }">
        {{ data.dead_line.split('T')[0] }}

        <Tag :severity="(() => {
          if (Math.ceil((new Date(data.dead_line) - new Date()) / (1000 * 60 * 60 * 24)) <= 0) return 'danger'
          if (Math.ceil((new Date(data.dead_line) - new Date()) / (1000 * 60 * 60 * 24)) > 0) return 'success'

        })()" :value="Math.ceil((new Date(data.dead_line) - new Date()) / (1000 * 60 * 60 * 24)) + ' дней'"></Tag>
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts" setup>
const appwrite = useAppwrite()
const notifications: Ref<any> = ref([])
onMounted(async () => {
  let data = await appwrite.database.listDocuments(
    "67c6dc2900328f8e22c8",
    "67c716040035fae92514"
  );
  notifications.value = data.documents;
})

</script>

<style></style>