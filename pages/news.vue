<template>
<div class="news_scroller">
  <div v-for="item in news" class="news">
    <div class="start">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="body">
        {{ item.body }}
      </div>
    </div>
    <iframe class="pdf" :src="item.pdf_file + '#toolbar=0&navpanes=0&scrollbar=0'" > </iframe>

  </div>
</div>
</template>

<script lang="ts" setup>
const appwrite = useAppwrite()
const news: Ref<any> = ref([])
onMounted(async () => {
  let data = await appwrite.database.listDocuments(
    "67c6dc2900328f8e22c8",
    "67c7160e00031a7c5dac"
  );
  news.value = data.documents;
})

</script>

<style scoped lang="scss">
.news_scroller {
  height: 80vh;
  overflow-y: auto;
}
.news {
  display: flex;
  height: 80vh;
  border: 1px solid black;
  border-radius: 8px;
  margin: 2vh;
  .start {
    flex: 0 0 60%;
    padding: 3vh;
    .title {
      text-align: center;
      font-size:xx-large;
    }
    .body {
      
    }
  }
  .pdf {
    flex: 0 0 40%;

  }
}
</style>